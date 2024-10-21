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
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface MediaThumbnailProps {
  name?: string;
  thumbnail?: OdysseyImageFile;
  className?: string;
}

export const MediaThumbnail: React.FC<
  MediaThumbnailProps & VariantProps<typeof thumbVariants>
> = ({ name, thumbnail, variant, className }) => (
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
      <div className="flex justify-center">
        <P size="lg" variant="gradient" className="bottom-2 uppercase truncate">
          {name}
        </P>
      </div>
    )}
  </div>
);
