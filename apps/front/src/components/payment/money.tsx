import { VariantProps } from "class-variance-authority";
import { P, textVariants } from "../typography/texts";
import React from "react";
import { cn } from "@/lib/utils";

interface MoneyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  value: number;
  currency: string;
}

export const Money = React.forwardRef<HTMLParagraphElement, MoneyProps>(
  ({ value, currency, variant, size, className, ...props }, ref) => {
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    return (
      <P
        ref={ref}
        variant={variant}
        size={size}
        className={cn(className)}
        {...props}
      >
        {formattedValue}
      </P>
    );
  }
);

Money.displayName = "Money";