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
    <div className="space-y-8 pb-8">
      {series ? (
        <MediaCarousel title="Destaques" medias={series} />
      ) : (
        <div>nada</div>
      )}
    </div>
  );
}
