"use client";

import { findSerieEpisodes } from "@/app/actions";
import { Serie, SerieEpisode } from "@/app/actions/series/types";
import { H2 } from "@/components/typography/headings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectGroup, SelectValue } from "@radix-ui/react-select";
import React, { useEffect, useState, useTransition } from "react";
// import { SerieMediaDetailsEpisode } from "./serie-media-details-episode";
import { Podcast, PodcastEpisode } from "@/app/actions/podcasts/types";
import { Button } from "@/components/ui/button";
import { findPodcastEpisodes } from "@/app/actions/podcasts";
import { PodcastMediaDetailsEpisode } from "./podcast-media-details-episode";
import { useRouter } from "next/navigation";

interface PodcastMediaDetailsProps {
  podcast: Podcast;
}

export const PodcastMediaDetails: React.FC<PodcastMediaDetailsProps> = ({
  podcast,
}) => {
  const router = useRouter();
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, startLoading] = useTransition();

  useEffect(() => {
    startLoading(async () => {
      const res = await findPodcastEpisodes({
        podcast: podcast.documentId,
        limit: 10,
      });
      setEpisodes(res.data);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between p-4">
        <H2>Últimos episódios</H2>
        <Button
          size="lg"
          variant="outline"
          onClick={() => router.push(`/podcasts/${podcast.documentId}`)}
        >
          Ver todos
        </Button>
      </div>
      <div>
        {episodes.map((ep) => (
          <PodcastMediaDetailsEpisode episode={ep} />
        ))}
      </div>
    </div>
  );
};
