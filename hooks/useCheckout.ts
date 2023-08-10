import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Payment } from "@/types";

interface CartStore {
  paymentMethod: Payment | null;
  setPaymentMethod: (payment: Payment) => void;
}

const useCheckout = create(
  persist<CartStore>(
    (set) => ({
      paymentMethod: null,
      setPaymentMethod: (payment: Payment) => {
        set({ paymentMethod: payment });
      },
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCheckout;
