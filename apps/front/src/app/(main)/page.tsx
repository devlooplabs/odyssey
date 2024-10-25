"use client";

import { useAuth } from "@/components/auth/auth-context";
import { useEffect, useState, useTransition } from "react";
import { Podcast } from "../actions/podcasts/types";
import { findPodcasts } from "../actions/podcasts";
import { MediaContentBanner } from "@/components/media/content/media-content-banner";
import { PodcastEpisodesCarousel } from "@/components/media/content/podcasts/podcast-episodes-carousel";
import { H2 } from "@/components/typography/headings";
import { MediaContent } from "../actions/types";
import { findFeaturedContent } from "../actions";
import { LiveEpisodesCarousel } from "@/components/media/content/lives/live-episodes-carousel";

export default function Home() {
  const [featured, setFeatured] = useState<MediaContent | null>(null);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loadingLatest, startLoadingLatest] = useTransition();
  const [loadingPodcasts, startLoadingPodcasts] = useTransition();

  useEffect(() => {
    startLoadingLatest(async () => {
      const { data: featured } = await findFeaturedContent();
      if (featured) setFeatured(featured);
    });

    startLoadingPodcasts(async () => {
      const res = await findPodcasts({ limit: 3 });
      setPodcasts(res.data);
    });
  }, []);

  const { isMember } = useAuth();
  return (
    <div className="w-full space-y-8">
      {featured && <MediaContentBanner content={featured} />}
      <div className="space-y-8">
        <div className="flex justify-center">
          <H2 variant="gradient">Lives</H2>
        </div>
        <LiveEpisodesCarousel />
      </div>
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
