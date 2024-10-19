"use client";

import { H2 } from "@/components/typography/headings";
import { useEffect, useState, useTransition } from "react";
import { MediaCarousel } from "@/components/media/media-carousel";
import { findSeries } from "@/app/actions";
import { Serie } from "@/app/actions/series/types";

export default function Series() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [loadingSeries, loadSeries] = useTransition();

  useEffect(() => {
    loadSeries(async () => {
      const res = await findSeries({});
      if (res.data) setSeries(res.data);
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="w-full flex justify-center">
        <H2 variant="gradient">Séries em destaque</H2>
      </div>
      <div className="w-full flex flex-wrap gap-8 justify-center">
        {series ? <MediaCarousel medias={series} /> : <div>nada</div>}
      </div>
    </div>
  );
}
