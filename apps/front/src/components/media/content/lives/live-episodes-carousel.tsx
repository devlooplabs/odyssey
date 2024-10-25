import React, { useEffect, useState, useTransition } from "react";
import { MediaContentCarousel } from "../media-content-carousel";
import { LiveEpisode } from "@/app/actions/lives/types";
import { findLiveEpisodes } from "@/app/actions";

interface LiveEpisodesCarouselProps {
  limit?: number;
}

export const LiveEpisodesCarousel: React.FC<
  LiveEpisodesCarouselProps
> = ({ limit = 12 }) => {
  const [eps, setEps] = useState<LiveEpisode[]>([]);
  const [loading, startLoading] = useTransition();

  useEffect(() => {
    startLoading(async () => {
      const res = await findLiveEpisodes({
        limit,
      });
      setEps(res.data);
    });
  }, []);

  return <MediaContentCarousel content={eps} />;
};
