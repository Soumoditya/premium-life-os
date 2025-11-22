import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const logs = await prisma.wellbeingLog.findMany({
        where: { user: { email: session.user.email } },
        orderBy: { date: 'desc' },
        take: 7
    });

    return NextResponse.json(logs);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { duration } = await req.json();

    const log = await prisma.wellbeingLog.create({
        data: {
            duration,
            user: { connect: { email: session.user.email } }
        }
    });

    return NextResponse.json(log);
}
