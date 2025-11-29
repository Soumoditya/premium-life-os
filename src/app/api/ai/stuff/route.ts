import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const messages = await prisma.chatMessage.findMany({
            where: {
                session: {
                    user: { email: session.user.email },
                },
                role: "model",
                OR: [
                    { content: { contains: "![Generated Image]" } },
                    { content: { contains: "```json" } },
                ],
            },
            orderBy: { createdAt: "desc" },
            take: 50,
        });

        const items = messages.map((msg: { id: string; content: string; createdAt: Date }) => ({
            id: msg.id,
            type: msg.content.includes("![Generated Image]") ? "image" : "chart",
            content: msg.content,
            createdAt: msg.createdAt,
        }));

        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
