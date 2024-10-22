"use client";

import { findPodcastEpisodes, findPodcasts } from "@/app/actions/podcasts";
import {
  Podcast,
  PodcastEpisode,
  WeekDays,
  WeekDaysText,
} from "@/app/actions/podcasts/types";
import { MediaContentCarousel } from "@/components/media/content/media-content-carousel";
import { MediaCard } from "@/components/media/media-card";
import { MediaThumbnail } from "@/components/media/media-thumbnail";
import { H1, H2, H3, H4 } from "@/components/typography/headings";
import { useEffect, useState, useTransition } from "react";

export default function Page() {
  const [loadingPodcast, startLoadingPodcasts] = useTransition();
  const [loadingEpisodes, startLoadingEpisodes] = useTransition();
  const [eps, setEps] = useState<PodcastEpisode[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    startLoadingEpisodes(async () => {
      const res = await findPodcastEpisodes({ limit: 12 });
      setEps(res.data);
    });

    startLoadingPodcasts(async () => {
      const res = await findPodcasts();
      setPodcasts(res.data);
    });
  }, []);

  const scheduled = podcasts?.filter((p) => p.dayOfWeek);
  return (
    <div className="container">
      <div className="space-y-8">
        <div className="flex justify-center">
          <H1 variant="gradient">Programação</H1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {Object.keys(WeekDays).map((key) => (
            <div key={key} className="flex flex-col gap-2">
              <div className="h-12 text-xl flex justify-center items-center text-primary font-semibold">
                {WeekDaysText[key as WeekDays]}
              </div>
              <div className="flex flex-col gap-2">
                {scheduled?.length > 0 &&
                  scheduled
                    .filter((podcast) => podcast.dayOfWeek === key)
                    .map((podcast) => (
                      <div key={podcast.documentId}>
                        <MediaCard variant="square" media={podcast} />
                      </div>
                    ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <MediaContentCarousel title="Últimos episódios" content={eps} />
        </div>
        <div className="space-y-8">
          <div className="flex justify-center">
            <H2>Podcasts</H2>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {podcasts.map((podcast) => (
                <MediaCard key={podcast.documentId} media={podcast} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
