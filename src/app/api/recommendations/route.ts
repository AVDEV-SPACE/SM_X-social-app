import prisma from '@/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json([]);

  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followedIds = following.map((f) => f.followingId);

  const users = await prisma.user.findMany({
    where: {
      id: { not: userId, notIn: followedIds },
      followings: { some: { followerId: { in: followedIds } } },
    },
    take: 3,
    select: { id: true, displayName: true, username: true, img: true },
  });

  return NextResponse.json(users);
}