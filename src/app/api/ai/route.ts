import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendMessageToGemini } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { message, sessionId, mode, imageParts } = await req.json();

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID required" }, { status: 400 });
        }

        // 1. Save User Message
        await prisma.chatMessage.create({
            data: {
                role: "user",
                content: message,
                sessionId,
            },
        });

        // 2. Fetch History
        const history = await prisma.chatMessage.findMany({
            where: { sessionId },
            orderBy: { createdAt: "asc" },
            take: 20, // Context window
        });

        const formattedHistory = history.map((h: { role: string; content: string }) => ({
            role: h.role as "user" | "model",
            parts: h.content,
        }));

        // 3. Call Gemini
        const aiResponse = await sendMessageToGemini(message, formattedHistory, mode, imageParts);

        // 4. Save AI Message
        const savedAiMessage = await prisma.chatMessage.create({
            data: {
                role: "model",
                content: aiResponse,
                sessionId,
            },
        });

        return NextResponse.json(savedAiMessage);
    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
