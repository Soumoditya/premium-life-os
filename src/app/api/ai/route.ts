import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get the most recent session or create one
    let chatSession = await prisma.chatSession.findFirst({
        where: { user: { email: session.user.email } },
        orderBy: { createdAt: 'desc' },
        include: { messages: true }
    });

    if (!chatSession) {
        chatSession = await prisma.chatSession.create({
            data: {
                title: "General Chat",
                user: { connect: { email: session.user.email } }
            },
            include: { messages: true }
        });
    }

    return NextResponse.json(chatSession.messages);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { role, content } = await req.json();

    // Get the most recent session
    const chatSession = await prisma.chatSession.findFirst({
        where: { user: { email: session.user.email } },
        orderBy: { createdAt: 'desc' }
    });

    if (!chatSession) return NextResponse.json({ error: "No session found" }, { status: 404 });

    const message = await prisma.chatMessage.create({
        data: {
            role,
            content,
            session: { connect: { id: chatSession.id } }
        }
    });

    return NextResponse.json(message);
}
