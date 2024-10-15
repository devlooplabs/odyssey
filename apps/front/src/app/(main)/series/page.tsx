"use client";

import { MediaCard } from "@/components/content/media/media-card";
import { MediaContentCard } from "@/components/content/media/media-content-card";
import { H2 } from "@/components/typography/headings";
import { Serie, SerieEpisode } from "@/lib/odyssey/types";
import { useEffect, useState, useTransition } from "react";
import { getSerieEpisodes, getSeries } from "./actions";

export default function Series() {
  const [episodes, setEpisodes] = useState<SerieEpisode[]>([]);
  const [loadingEpisodes, loadEpisodes] = useTransition();

  const [series, setSeries] = useState<Serie[]>([]);
  const [loadingSeries, loadSeries] = useTransition();

  useEffect(() => {
    loadEpisodes(async () => {
      const episodes = await getSerieEpisodes(undefined, 3);
      if (episodes) setEpisodes(episodes);
    });

    loadSeries(async () => {
      const series = await getSeries();
      if (series) setSeries(series);
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="w-full flex justify-center">
        <H2 variant="gradient">Últimos episódios</H2>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {episodes.map((ep) => (
          <MediaContentCard
            name={ep.name}
            url={`/series/episodes/${ep.documentId}`}
            publishedAt={ep.publishedAt}
            description={ep.description}
            thumbnail={
              ep.thumbnail
                ? `${process.env.NEXT_PUBLIC_ODYSSEY_STRAPI_BASE_URL}${ep.thumbnail?.url}`
                : undefined
            }
          />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <H2 variant="gradient">Séries em destaque</H2>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {series.map((serie) => (
          <MediaCard
            name={serie.name}
            url={`/series/${serie.documentId}`}
            thumbnail={
              serie.thumbnail
                ? `${process.env.NEXT_PUBLIC_ODYSSEY_STRAPI_BASE_URL}${serie.thumbnail?.url}`
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
