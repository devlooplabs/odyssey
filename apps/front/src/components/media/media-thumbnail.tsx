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
      book: "aspect-[2/3]",
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
  <div className={cn("overflow-hidden", thumbVariants({ variant, className }))}>
    {thumbnail && (
      <Image
        src={
          variant === "book"
            ? thumbnail.formats.large.url
            : thumbnail.formats.medium.url
        }
        alt="placeholder"
        style={{
          objectFit: "cover",
        }}
        draggable={false}
        fill
      />
    )}
    {name && (
      <div className="absolute inset-0 h-full w-full text-center flex items-end justify-center bg-gradient-to-t from-black/50 to-transparent">
        <span>
          {number && (
            <span
              className="text-6xl text-black font-bold"
              style={{
                WebkitTextStrokeWidth: 1,
                WebkitTextStrokeColor: "white",
              }}
            >
              {number}
            </span>
          )}
          <span
            className={cn({
              "text-4xl": variant === "book",
              "text-2xl font-semibold bg-gradient-to-r from-primary via-white via-30% to-white to-90% inline-block text-transparent bg-clip-text":
                variant !== "book",
            })}
          >
            {name}
          </span>
        </span>
      </div>
    )}
  </div>
);
