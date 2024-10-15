import React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground",
      gradient:
        "bg-gradient-to-r from-primary via-white via-30% to-white to-90% inline-block text-transparent bg-clip-text",
      lead: "text-xl text-muted-foreground"
    },
    size: {
      default: "",
      sm: "text-sm font-medium leading-none",
      lg: "text-lg font-semibold",
      xl: "text-3xl font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof textVariants>
>(({ className, variant, size, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(textVariants({ variant, size, className }))}
    {...props}
  />
));

P.displayName = "P";

const Quote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement> & VariantProps<typeof textVariants>
>(({ className, variant, size, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(textVariants({ variant, size, className }))}
    {...props}
  />
));

Quote.displayName = "Quote";

export { P, Quote };
