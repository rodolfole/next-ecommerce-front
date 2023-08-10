"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { LuExpand } from "react-icons/lu";

import Currency from "@/components/ui/Currency";
import IconButton from "@/components/ui/IconButton";
import HeartButton from "./HeartButton";
import usePreviewModal from "@/hooks/usePreviewModal";
import useUser from "@/hooks/useUser";
import { IProduct } from "@/types";

interface ProductCard {
  product: IProduct;
}

const ProductCard: React.FC<ProductCard> = ({ product }) => {
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product?.id}`);
  };

  const { user } = useUser();

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(product);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 relative"
    >
      <div className="absolute right-3 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center">
        <HeartButton currentUser={user} productId={product.id} />
      </div>

      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={product.images?.[0]?.url}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<LuExpand size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>

      <div>
        <p className="font-semibold text-lg">{product.name}</p>
        <p className="text-sm text-gray-500">{product.category?.name}</p>
      </div>

      <div className="flex items-center justify-between">
        <Currency value={product?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
