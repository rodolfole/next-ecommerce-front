import * as React from "react";

import { cn } from "@/lib/utils";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, disabled, errors, id, register, required, type, ...props },
    ref
  ) => {
    return (
      <input
        className={cn(
          "py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400",
          className,
          errors && "border-rose-600"
        )}
        disabled={disabled}
        {...register(id!, { required })}
        {...props}
        type={type}
      />
    );
  }
);

export default Input;
