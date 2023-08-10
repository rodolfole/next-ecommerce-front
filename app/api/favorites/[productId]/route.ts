import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  productId?: string;
}

export async function POST(_: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push({ id: "", productId, userId: currentUser.id });

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: {
        create: favoriteIds.map(({ productId }) => ({ productId })),
      },
    },
  });

  return NextResponse.json({ ok: true, user });
}

export async function DELETE(_: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid ID");
  }

  await prisma.favoriteProducts.deleteMany({
    where: { productId },
  });

  const user = await prisma.user.findFirst({
    where: { id: currentUser.id },
  });

  return NextResponse.json(user);
}
