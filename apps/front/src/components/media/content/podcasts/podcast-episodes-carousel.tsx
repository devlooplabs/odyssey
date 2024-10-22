import { Podcast, PodcastEpisode } from "@/app/actions/podcasts/types";
import React, { useEffect, useState, useTransition } from "react";
import { MediaContentCarousel } from "../media-content-carousel";
import { findPodcastEpisodes } from "@/app/actions/podcasts";

interface PodcastEpisodesCarouselProps {
  podcast: Podcast;
  limit?: number;
}

export const PodcastEpisodesCarousel: React.FC<
  PodcastEpisodesCarouselProps
> = ({ podcast, limit }) => {
  const [eps, setEps] = useState<PodcastEpisode[]>([]);
  const [loading, startLoading] = useTransition();

  useEffect(() => {
    startLoading(async () => {
      const res = await findPodcastEpisodes({
        podcast: podcast.documentId,
        limit,
      });
      setEps(res.data);
    });
  }, [podcast.documentId]);

  return <MediaContentCarousel title={podcast.name} content={eps} />;
};
