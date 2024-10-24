import Image from "next/image";
import React from "react";
import { H1 } from "../typography/headings";
import { P } from "../typography/texts";
import { Media } from "@/app/actions/types";
import { cn } from "@/lib/utils";

interface MediaBannerProps {
  media: Media;
  className?: string;
}

export const MediaBanner: React.FC<MediaBannerProps> = ({
  media,
  className,
}) => {
  return (
    <div
      className={cn("relative w-full aspect-[6/2] overflow-hidden", className)}
    >
      <div className="absolute inset-0 ">
        {media.thumbnail && (
          <Image
            src={media.thumbnail.url}
            alt="thumbnail"
            style={{
              objectFit: "cover",
            }}
            draggable={false}
            sizes="100%"
            fill
          />
        )}
      </div>
      <div className="absolute w-full h-full inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent">
        <H1 variant="gradient">{media.name}</H1>
        {media.description && <P variant="gradient">{media.description}</P>}
      </div>
    </div>
  );
};
