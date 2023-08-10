import { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  variant?: "fill" | "outlined";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      type = "button",
      variant = "fill",
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          `
            active:scale-95
            border
            disabled:cursor-not-allowed
            disabled:opacity-50
            duration-200
            flex
            font-semibold
            hover:border-2
            hover:border-black
            hover:opacity-75
            items-center
            justify-center
            transition
            w-auto
          `,
          className,
          disabled && "cursor-not-allowed opacity-75",
          variant === "fill"
            ? "border-transparent bg-black text-white"
            : "border-slate-400 bg-transparent text-black"
        )}
        disabled={disabled}
        ref={ref}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
