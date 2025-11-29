import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const notes = await prisma.note.findMany({
        where: { user: { email: session.user.email } },
        orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(notes);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content, color } = await req.json();

    const note = await prisma.note.create({
        data: {
            title,
            content,
            color,
            user: { connect: { email: session.user.email } },
        },
    });

    return NextResponse.json(note);
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, title, content, color } = await req.json();

    const note = await prisma.note.update({
        where: { id },
        data: { title, content, color },
    });

    return NextResponse.json(note);
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.note.delete({
        where: { id },
    });

    return NextResponse.json({ success: true });
}
