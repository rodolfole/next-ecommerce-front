import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { IShippingAddress, ICartProduct, ISize } from "@/types";

interface CartStore {
  addProduct: (product: ICartProduct) => void;
  numberOfProducts: number;
  products: ICartProduct[];
  removeAll: () => void;
  removeProduct: (id: string, size?: ISize) => void;
  setOrderSummary: () => void;
  shippingAddress: IShippingAddress | null;
  subTotal: number;
  tax: number;
  total: number;
  updateCartQuantity: (product: ICartProduct) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      addProduct: (product: ICartProduct) => {
        const productInCart = get().products.some(
          (productCart) => productCart.id === product.id
        );

        if (!productInCart)
          return set({ products: [...get().products, product] });

        const productInCartDifferentSize = get().products.some(
          (p) => p.id === product.id && p.size?.value === product.size?.value
        );

        if (!productInCartDifferentSize)
          return set({ products: [...get().products, product] });

        const updatedProducts = get().products.map((p) => {
          if (p.id !== product.id) return p;
          if (p.size?.value !== product.size?.value) return p;

          p.quantity += product.quantity;

          return p;
        });
        set({ products: updatedProducts });

        toast.success("Product added to cart.");
      },
      numberOfProducts: 0,
      products: [],
      removeAll: () => set({ products: [] }),
      removeProduct: (id: string, size?: ISize) => {
        set({
          products: [
            ...get().products.filter(
              (product) => !(product.id === id && product.size === size)
            ),
          ],
        });
        toast.success("Product removed from cart.");
      },
      setOrderSummary: () => {
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const subTotal = get().products.reduce(
          (prev, current) => current.price * current.quantity + prev,
          0
        );

        set({
          subTotal,
          tax: get().subTotal * taxRate,
          total: get().subTotal,
        });
      },
      shippingAddress: null,
      subTotal: 0,
      tax: 0,
      total: 0,
      updateCartQuantity: (product: ICartProduct) =>
        set({
          products: get().products.map((p) => {
            if (p.id !== product.id) return p;
            if (p.size !== product.size) return p;

            p.quantity = product.quantity;

            return p;
          }),
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
