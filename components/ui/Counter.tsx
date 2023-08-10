"use client";

import { FC } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  currentValue: number;
  maxValue: number;
  updatedQuantity: (value: number) => void;
}

const Counter: FC<CounterProps> = ({
  currentValue,
  maxValue,
  updatedQuantity,
}) => {
  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return;
      return updatedQuantity(currentValue - 1);
    }

    if (currentValue >= maxValue) return;

    updatedQuantity(currentValue + 1);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={() => addOrRemove(-1)}
          className="
            border-[1px]
            border-neutral-400
            cursor-pointer
            flex
            h-10
            hover:opacity-80
            items-center
            justify-center
            rounded-full
            text-neutral-600
            transition
            w-10
          "
        >
          <AiOutlineMinus />
        </div>
        <div
          className="
            font-light 
            text-neutral-600
            text-xl 
          "
        >
          {currentValue}
        </div>
        <div
          onClick={() => addOrRemove(+1)}
          className="
            border-[1px]
            border-neutral-400
            cursor-pointer
            flex
            h-10
            hover:opacity-80
            items-center
            justify-center
            rounded-full
            text-neutral-600
            transition
            w-10
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
