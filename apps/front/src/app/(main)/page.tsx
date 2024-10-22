"use client";

import { useAuth } from "@/components/auth/auth-context";
import { Hero } from "./components/hero/hero";
import { Explore } from "./components/explore/expore";
import { useEffect, useState, useTransition } from "react";
import { Podcast, PodcastEpisode } from "../actions/podcasts/types";
import { findPodcastEpisodes, findPodcasts } from "../actions/podcasts";
import { MediaContentBanner } from "@/components/media/content/media-content-banner";
import { MediaContentCarousel } from "@/components/media/content/media-content-carousel";
import { PodcastEpisodesCarousel } from "@/components/media/content/podcasts/podcast-episodes-carousel";
import { H2 } from "@/components/typography/headings";

export default function Home() {
  const [latest, setLatest] = useState<PodcastEpisode | null>(null);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loadingLatest, startLoadingLatest] = useTransition();
  const [loadingPodcasts, startLoadingPodcasts] = useTransition();

  useEffect(() => {
    startLoadingLatest(async () => {
      const res = await findPodcastEpisodes({ limit: 1 });
      if (res.data.length) setLatest(res.data[0]);
    });

    startLoadingPodcasts(async () => {
      const res = await findPodcasts();
      setPodcasts(res.data);
    });
  }, []);

  const { isMember } = useAuth();
  return (
    <div className="w-full space-y-8">
      {latest && <MediaContentBanner content={latest} />}
      <div className="space-y-8">
        <div className="flex justify-center">
          <H2 variant="gradient">Podcasts</H2>
        </div>
        <div className="space-y-4">
          {podcasts.map((podcast) => (
            <PodcastEpisodesCarousel podcast={podcast} />
          ))}
        </div>
      </div>
    </div>
  );
}
