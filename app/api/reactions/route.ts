import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Ensure the singleton row exists
async function getOrCreateReactions() {
  let reaction = await prisma.reaction.findUnique({
    where: { id: "singleton" },
  });

  if (!reaction) {
    reaction = await prisma.reaction.create({
      data: { id: "singleton", happy: 0, love: 0, sad: 0 },
    });
  }

  return reaction;
}

export async function GET() {
  try {
    const reaction = await getOrCreateReactions();
    return NextResponse.json({
      happy: reaction.happy,
      love: reaction.love,
      sad: reaction.sad,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reactions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type } = body;

    if (!["happy", "love", "sad"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid reaction type" },
        { status: 400 }
      );
    }

    // Ensure row exists
    await getOrCreateReactions();

    const reaction = await prisma.reaction.update({
      where: { id: "singleton" },
      data: {
        [type]: { increment: 1 },
      },
    });

    return NextResponse.json({
      happy: reaction.happy,
      love: reaction.love,
      sad: reaction.sad,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update reaction" },
      { status: 500 }
    );
  }
}
