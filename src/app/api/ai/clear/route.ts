import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Delete all chat sessions and folders for the user
        // Cascading delete should handle messages
        await prisma.chatSession.deleteMany({
            where: { userId: user.id },
        });

        await prisma.chatFolder.deleteMany({
            where: { userId: user.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Clear History Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
