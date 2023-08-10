"use client";

import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

import useFavorite from "@/hooks/useFavorite";
import { ICurrentUser } from "@/types";

interface HeartButtonProps {
  productId: string;
  currentUser?: ICurrentUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  productId,
  currentUser,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { hasFavorited, toggleFavorite } = useFavorite({
    productId,
    currentUser,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
