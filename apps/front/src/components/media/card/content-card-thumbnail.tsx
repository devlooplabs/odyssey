import { P } from "@/components/typography/texts";
import Image from "next/image";
import React from "react";
import { OdysseyImageFile } from "@/lib/odyssey/types";

interface ContentCardThumbnailProps {
  name: string;
  thumbnail?: OdysseyImageFile;
}

export const ContentCardThumbnail: React.FC<ContentCardThumbnailProps> = ({
  name,
  thumbnail,
}) => (
  <div className="w-full aspect-video bg-card relative">
    {thumbnail && (
      <Image
        src={thumbnail.formats.medium.url}
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
      {name}
    </P>
  </div>
);
