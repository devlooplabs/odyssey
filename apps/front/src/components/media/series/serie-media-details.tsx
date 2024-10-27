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
import { SerieMediaDetailsEpisode } from "./serie-media-details-episode";

interface SerieMediaDetailsProps {
  serie: Serie;
}

export const SerieMediaDetails: React.FC<SerieMediaDetailsProps> = ({
  serie,
}) => {
  const defaultSeason = serie.seasons?.length
    ? serie.seasons[0].documentId
    : undefined;

  const [season, setSeason] = useState(defaultSeason);
  const [episodes, setEpisodes] = useState<SerieEpisode[]>([]);
  const [loading, startLoading] = useTransition();

  useEffect(() => {
    startLoading(async () => {
      const res = await findSerieEpisodes({
        seasonId: season,
      });

      if (res.data) setEpisodes(res.data);
    });
  }, [season]);

  return (
    <div>
      <div className="flex justify-between p-4">
        <H2>Episódios</H2>
        <Select defaultValue={defaultSeason} onValueChange={setSeason}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {serie.seasons &&
                serie.seasons.map((season) => (
                  <SelectItem key={season.documentId} value={season.documentId}>
                    {season.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        {episodes.map((ep) => (
          <SerieMediaDetailsEpisode key={ep.documentId} episode={ep} />
        ))}
      </div>
    </div>
  );
};
