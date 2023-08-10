"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/Button";
import Currency from "@/components/ui/Currency";
import useAuthModal from "@/hooks/useAuthModal";
import useCart from "@/hooks/useCart";
import useUser from "@/hooks/useUser";
import { IProduct, ISize } from "@/types";
import HeartButton from "./ui/HeartButton";
import { SizeSelector } from "./ui/SizeSelector";

interface InfoProps {
  product: IProduct;
}

const Info: React.FC<InfoProps> = ({ product }) => {
  const onOpen = useAuthModal((state) => state.onOpen);
  const addProduct = useCart((state) => state.addProduct);
  const user = useUser((state) => state.user);

  const { sizes, ...productT } = product;

  const [tempProduct, setTempProduct] = useState({
    ...productT,
    price: Number(productT.price),
    quantity: 1,
    size: {} as ISize,
  });

  const onAddToCart = () => {
    if (Object.keys(tempProduct.size).length === 0) {
      toast.error("Select one size.");
      return;
    }
    addProduct(tempProduct);
  };

  const onSelectedSize = (size: ISize) => {
    setTempProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={product?.price} />
        </div>
      </div>
      <hr className="my-4" />

      <div className="grid grid-cols-5 gap-1">
        {product?.colors.map((color, index) => (
          <Button
            className="h-[70px] rounded-md w-[70px] overflow-clip"
            key={index.toString()}
          >
            <img className="object-contain" src={color.url} alt={color.name} />
          </Button>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="font-semibold text-black">Select size</h3>
        <SizeSelector
          onSelectedSize={onSelectedSize}
          selectedSize={tempProduct.size}
          sizes={product.sizes}
        />
      </div>
      <div className="flex flex-col mt-4 gap-y-3">
        {product.stock > 0 ? (
          <Button
            className="
            flex-grow
            gap-x-2
            px-5
            py-3
            rounded-full
          "
            onClick={onAddToCart}
          >
            Add To Cart
          </Button>
        ) : (
          <p>No hay disponibles</p>
        )}
        <Button
          className="
            flex-grow
            gap-x-2
            px-5
            py-3
            rounded-full
          "
          onClick={() => !user && onOpen("Login")}
          variant="outlined"
        >
          <HeartButton productId={product.id} currentUser={user} /> Add To
          Favorites
        </Button>
      </div>
    </div>
  );
};

export default Info;
