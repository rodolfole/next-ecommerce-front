import axios from "axios";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { ICurrentUser } from "@/types";
import useAuthModal from "./useAuthModal";

interface IUseFavorite {
  productId: string;
  currentUser?: ICurrentUser | null;
}

const useFavorite = ({ productId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const onOpen = useAuthModal((state) => state.onOpen);

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds.map((fav) => fav.productId) || [];

    return list.includes(productId);
  }, [currentUser, productId]);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return onOpen("Login");
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${productId}`);
        } else {
          request = () => axios.post(`/api/favorites/${productId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, productId /*loginModal*/, , router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
