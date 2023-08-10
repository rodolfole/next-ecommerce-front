import prisma from "@/lib/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteProducts() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.product.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds.map((p) => p.productId) || [])],
        },
      },
      include: {
        category: {
          include: { billboard: true },
        },
        colors: true,
        images: true,
        sizes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const saveFavorites = favorites.map((f) => ({
      ...f,
      price: String(f.price),
    }));

    return saveFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
