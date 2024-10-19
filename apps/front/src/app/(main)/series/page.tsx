"use client";

import { MediaCard } from "@/components/media/media/media-card";
import { MediaContentCard } from "@/components/media/media/media-content-card";
import { H2 } from "@/components/typography/headings";
import { Serie, SerieEpisode } from "@/lib/odyssey/types";
import { useEffect, useState, useTransition } from "react";
import { getSerieEpisodes, getSeries } from "./actions";
import { MediaCarousel } from "@/components/media/media-carousel";

export default function Series() {
  const [episodes, setEpisodes] = useState<SerieEpisode[]>([]);
  const [loadingEpisodes, loadEpisodes] = useTransition();

  const [series, setSeries] = useState<Serie[]>([]);
  const [loadingSeries, loadSeries] = useTransition();

  useEffect(() => {
    loadSeries(async () => {
      const series = await getSeries();
      if (series) setSeries(series);
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* <div className="w-full flex justify-center">
        <H2 variant="gradient">Últimos episódios</H2>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {episodes.map((ep) => (
          <MediaContentCard
            name={ep.name}
            url={`/series/episodes/${ep.documentId}`}
            publishedAt={ep.publishedAt}
            description={ep.description}
            thumbnail={ep.thumbnail?.formats.medium.url}
          />
        ))}
      </div> */}
      <div className="w-full flex justify-center">
        <H2 variant="gradient">Séries em destaque</H2>
      </div>
      <div className="w-full flex flex-wrap gap-8 justify-center">
        {series ? <MediaCarousel medias={series} /> : <div>nada</div>}
      </div>
    </div>
  );
}
