"use client";

import { findLiveEpisodes } from "@/app/actions";
import { LiveEpisode } from "@/app/actions/lives/types";
import { MediaContentCard } from "@/components/media/content/media-content-card";
import { MediaThumbnail } from "@/components/media/media-thumbnail";
import { H2 } from "@/components/typography/headings";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

export function LiveEpisodes() {
  const [episodes, setEpisodes] = useState<LiveEpisode[]>([]);
  const [loading, startLoading] = useTransition();

  useEffect(() => {
    startLoading(async () => {
      const { data: episodes } = await findLiveEpisodes({});
      setEpisodes(episodes);
    });
  }, []);

  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-center">
        <H2 variant="gradient">Lives Anteriores</H2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        {episodes?.map((episode) => (
          <MediaContentCard
            key={episode.documentId}
            content={episode}
            className="border hover:border-primary/50 rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
}
