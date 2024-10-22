import React from "react";
import { SerieMediaDetails } from "./series/serie-media-details";
import { Media, MediaType } from "@/app/actions/types";
import { Serie } from "@/app/actions/series/types";
import { PodcastMediaDetails } from "./podcasts/podcast-media-details";
import { Podcast } from "@/app/actions/podcasts/types";

interface MediaDetailsProps {
  media: Media;
}

export const MediaDetails: React.FC<MediaDetailsProps> = ({ media }) => {
  switch (media.type) {
    case MediaType.serie:
      return <SerieMediaDetails serie={media as Serie} />;
    case MediaType.podcast:
      return <PodcastMediaDetails podcast={media as Podcast} />;
    default:
      return null;
  }
};
