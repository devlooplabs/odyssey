import { Media, MediaType } from "@/lib/odyssey/types";
import React from "react";
import { SerieMediaDetails } from "./series/serie-media-details";

interface MediaDetailsProps {
  media: Media;
}

export const MediaDetails: React.FC<MediaDetailsProps> = ({ media }) => {
  switch (media.type) {
    case MediaType.serie:
      return <SerieMediaDetails serie={media} />
    default:
      return <div>nada nada nada</div>;
  }
}
