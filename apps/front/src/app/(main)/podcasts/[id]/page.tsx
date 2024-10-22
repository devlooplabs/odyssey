"use client";

import {
  findPodcast,
  findPodcastEpisodes,
  findPodcasts,
} from "@/app/actions/podcasts";
import {
  Podcast,
  PodcastEpisode,
  WeekDays,
  WeekDaysText,
} from "@/app/actions/podcasts/types";
import { MediaContentCard } from "@/components/media/content/media-content-card";
import { MediaContentCarousel } from "@/components/media/content/media-content-carousel";
import { MediaBanner } from "@/components/media/media-banner";
import { MediaCard } from "@/components/media/media-card";
import { MediaThumbnail } from "@/components/media/media-thumbnail";
import { H1, H2, H3, H4 } from "@/components/typography/headings";
import { P } from "@/components/typography/texts";
import { useEffect, useState, useTransition } from "react";

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  const [loading, startLoading] = useTransition();
  const [loadingEps, startLoadingEps] = useTransition();
  const [eps, setEps] = useState<PodcastEpisode[]>([]);
  const [podcast, setPodcast] = useState<Podcast | null>(null);

  useEffect(() => {
    startLoadingEps(async () => {
      const res = await findPodcastEpisodes({ podcast: params.id });
      setEps(res.data);
    });

    startLoading(async () => {
      const res = await findPodcast(params.id);
      setPodcast(res.data);
    });
  }, [params.id]);

  return (
    <div className="container space-y-8">
      {podcast && <MediaBanner media={podcast} />}
      <div>
        <div className="flex justify-center">
          <H2>Episódios</H2>
        </div>
        <div className="flex flex-wrap gap-4">
          {eps.map((ep) => (
            <div key={ep.documentId} className="w-full max-w-[300px] bg-card rounded-xl overflow-hidden">
              <MediaContentCard content={ep} />
              <div className="p-2">
                <P className="line-clamp-3">{ep.description}</P>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
