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

function formatValue(value: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export const Money: React.FC<MoneyProps> = ({ value, currency }) => (
  <>{formatValue(value, currency)}</>
);

Money.displayName = "Money";
