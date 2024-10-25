"use client";

import { H1, H2 } from "@/components/typography/headings";
import { useEffect, useState, useTransition } from "react";
import { findSerieEpisodes, findSeries } from "@/app/actions";
import { Serie, SerieEpisode } from "@/app/actions/series/types";
import { MediaContentCarousel } from "@/components/media/content/media-content-carousel";
import { MediaCard } from "@/components/media/media-card";
import { Loading } from "@/components/loading/loading";

export default function Series() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [latest, setLatest] = useState<SerieEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [, startLoading] = useTransition();

  useEffect(() => {
    startLoading(async () => {
      const { data: series } = await findSeries({});
      if (series) setSeries(series);

      const { data: latest } = await findSerieEpisodes({ limit: 12 });
      if (latest) setLatest(latest);

      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!series.length) {
    return (
      <div className="flex justify-center">
        <H2>Nenhuma série publicada até o momento.</H2>
      </div>
    );
  }

  return (
    <div className="container space-y-8 pb-8">
      <div>
        <MediaContentCarousel title="Últimos episódios" content={latest} />
      </div>
      <div className="space-y-8">
        <div className="flex justify-center">
          <H2>Séries</H2>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {series.map((serie) => (
              <MediaCard key={serie.documentId} media={serie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
