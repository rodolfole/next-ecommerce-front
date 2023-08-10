import { SiMercadopago } from "react-icons/si";
import { FaCcStripe } from "react-icons/fa";

import useCheckout from "@/hooks/useCheckout";
import RadioButton from "./RadioButton";
import { Payment } from "@/types";

const payments: Payment[] = [
  {
    icon: SiMercadopago,
    img: "/assets/img/creditcard.png",
    name: "Mercado Pago",
    value: "mercadopago",
  },
  {
    icon: FaCcStripe,
    img: "/assets/img/polygon.png",
    name: "Stripe",
    value: "stripe",
  },
];

const PaymentMethod = () => {
  const setPaymentMethod = useCheckout((state) => state.setPaymentMethod);

  const handleOnChange = (event: any) => {
    const selectedPayment = payments.find(
      (plan) => plan.value === event.target.value
    );
    setPaymentMethod(selectedPayment!);
  };

  return (
    <div className="flex flex-col justify-center items-center md:items-start pt-6">
      {payments.map((payment, index) => (
        <RadioButton
          icon={payment.icon}
          id={payment.value}
          key={index}
          label={payment.name}
          name="payments"
          onChange={handleOnChange}
          value={payment.value}
        />
      ))}
    </div>
  );
};

export default PaymentMethod;
