import Image from "next/image";
import { Media } from "@/lib/odyssey/types";
import { P } from "../typography/texts";

interface MediaThumbnailProps {
  media: Media;
}

export const MediaThumbnail: React.FC<MediaThumbnailProps> = ({ media }) => (
  <div className="w-full aspect-video bg-card relative">
    {media.thumbnail && (
      <Image
        src={media.thumbnail.formats.medium.url}
        alt="placeholder"
        style={{
          objectFit: "contain",
        }}
        draggable={false}
        fill
      />
    )}
    <P
      size="lg"
      variant="gradient"
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 uppercase"
    >
      {media.name}
    </P>
  </div>
);
