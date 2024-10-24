import Image from "next/image";
import { P } from "../typography/texts";
import { Media, OdysseyImageFile } from "@/app/actions/types";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const thumbVariants = cva("w-full bg-card relative", {
  variants: {
    variant: {
      default: "aspect-video",
      square: "aspect-square",
      book: "aspect-[2/3] border border-primary rounded-3xl",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface MediaThumbnailProps {
  number?: number;
  name?: string;
  thumbnail?: OdysseyImageFile;
  className?: string;
}

export const MediaThumbnail: React.FC<
  MediaThumbnailProps & VariantProps<typeof thumbVariants>
> = ({ number, name, thumbnail, variant, className }) => (
  <div className={cn(thumbVariants({ variant, className }))}>
    {thumbnail && (
      <Image
        src={thumbnail.formats.medium.url}
        alt="placeholder"
        style={{
          objectFit: "cover",
        }}
        draggable={false}
        fill
      />
    )}
    {name && (
      <div className="absolute flex justify-center bottom-2 w-full text-center">
        {number && (
          <span className="text-5xl [&::-webkit-text-stroke]:[1px]">{number}</span>
        )}
        <P
          size={variant === "book" ? "xl" : "lg"}
          variant={variant !== "book" ? "gradient" : "default"}
          className={cn({ "truncate uppercase": variant !== "book" })}
        >
          {name}
        </P>
      </div>
    )}
  </div>
);
