"use client";

import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/Button";
import Currency from "@/components/ui/Currency";
import useCart from "@/hooks/useCart";
import useCheckout from "@/hooks/useCheckout";
import PaymentMethod from "./PaymentMethod";

const Summary = () => {
  const searchParams = useSearchParams();
  const products = useCart((state) => state.products);
  const payment = useCheckout((state) => state.paymentMethod);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const numberOfProducts = products.reduce(
    (prev, current) => current.quantity + prev,
    0
  );

  const total = products.reduce(
    (prev, current) => current.price * current.quantity + prev,
    0
  );

  const onCheckout = async () => {
    if (payment?.value === "mercadopago") {
      console.log("mercadopago");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout/mercadopago`,
        {
          productIds: products.map((product) => product.id),
        }
      );

      window.location.assign(response.data.url);
    } else {
      console.log({ payment });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout/stripe`,
        {
          productIds: products.map((product) => product.id),
        }
      );

      window.location = response.data.url;
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">
            No. Products
          </div>
          <p>{numberOfProducts} products</p>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={total} />
        </div>
      </div>
      <PaymentMethod />
      <Button
        onClick={onCheckout}
        disabled={products.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
