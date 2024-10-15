import { cva, type VariantProps } from "class-variance-authority";
export const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground",
      gradient:
        "bg-gradient-to-r from-primary via-white via-30% to-white to-90% inline-block text-transparent bg-clip-text",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type TypographyVariants = VariantProps<typeof typographyVariants>;
