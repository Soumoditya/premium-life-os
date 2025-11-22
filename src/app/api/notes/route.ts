import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const notes = await prisma.note.findMany({
        where: { user: { email: session.user.email } },
        orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(notes);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content, color } = await req.json();

    const note = await prisma.note.create({
        data: {
            title: title || "New Note",
            content: content || "",
            color: color || "#1f2937",
            user: { connect: { email: session.user.email } }
        }
    });

    return NextResponse.json(note);
}
