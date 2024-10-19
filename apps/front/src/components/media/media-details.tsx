import React from "react";
import { SerieMediaDetails } from "./series/serie-media-details";
import { Media, MediaType } from "@/app/actions/types";

interface MediaDetailsProps {
  media: Media;
}

export const MediaDetails: React.FC<MediaDetailsProps> = ({ media }) => {
  switch (media.type) {
    case MediaType.serie:
      return <SerieMediaDetails serie={media} />
    default:
      return null;
  }
}
