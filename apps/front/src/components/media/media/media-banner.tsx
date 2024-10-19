import Image from "next/image";
import React from "react";
import placeholder from "../../../../public/images/image-placeholder.svg";
import { H1 } from "@/components/typography/headings";
import { P } from "@/components/typography/texts";

interface MediaBannerProps {
  name: string;
  thumbnail?: string;
  description?: string;
}

export const MediaBanner: React.FC<MediaBannerProps> = ({
  name,
  thumbnail,
  description,
}) => {
  return (
    <div className="relative w-full aspect-[6/2] overflow-hidden border border-primary rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <Image
          src={thumbnail || placeholder}
          alt="placeholder"
          objectFit="cover"
          draggable={false}
          sizes="100%"
          fill
        />
      </div>
      <div className="absolute left-0 bottom-0 p-6 flex flex-col">
        <H1 variant="gradient">{name}</H1>
        {description && <P variant="gradient">{description}</P>}
      </div>
    </div>
  );
};
