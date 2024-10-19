import Image from "next/image";
import React from "react";
import { H1 } from "../typography/headings";
import { P } from "../typography/texts";
import { Media } from "@/lib/odyssey/types";

interface MediaBannerProps {
  media: Media;
}

export const MediaBanner: React.FC<MediaBannerProps> = ({ media }) => {
  return (
    <div className="relative w-full aspect-[6/2] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        {media.thumbnail && (
          <Image
            src={media.thumbnail.url}
            alt="placeholder"
            objectFit="cover"
            draggable={false}
            sizes="100%"
            fill
          />
        )}
      </div>
      <div className="absolute left-0 bottom-0 p-6 flex flex-col">
        <H1 variant="gradient">{media.name}</H1>
        {media.description && <P variant="gradient">{media.description}</P>}
      </div>
    </div>
  );
};
