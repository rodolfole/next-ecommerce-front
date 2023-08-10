import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";

import Counter from "@/components/ui/Counter";
import Currency from "@/components/ui/Currency";
import IconButton from "@/components/ui/IconButton";
import useCart from "@/hooks/useCart";
import { ICartProduct } from "@/types";

interface CartItemProps {
  product: ICartProduct;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const router = useRouter();
  const [removeProduct, updateCartQuantity] = useCart((state) => [
    state.removeProduct,
    state.updateCartQuantity,
  ]);

  const onRemove = () => {
    removeProduct(product.id, product.size);
  };

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;

    updateCartQuantity(product);
  };

  const handleClick = () => {
    router.push(`/product/${product?.id}`);
  };

  return (
    <li className="flex py-6 border-b">
      <div
        className="relative h-24 w-24 rounded-md cursor-pointer overflow-hidden sm:h-48 sm:w-48"
        onClick={handleClick}
      >
        <Image
          fill
          src={product.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-row justify-between">
        <div className="flex flex-col px-5">
          <p className="text-2xl font-semibold text-black">{product.name}</p>
          <p className="text-lg font-semibold text-gray-500">
            <strong>Size: </strong>
            {product.size?.name}
          </p>
          <Counter
            currentValue={product.quantity}
            maxValue={10}
            updatedQuantity={(value) =>
              onNewCartQuantityValue(product as ICartProduct, value)
            }
          />
        </div>
        <div className="relative flex flex-row gap-5">
          <Currency value={product.price} />
          <div className=" z-10 right-0 top-0">
            <IconButton onClick={onRemove} icon={<MdClose size={15} />} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
