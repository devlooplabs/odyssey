"use client";

import { H2 } from "@/components/typography/headings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Serie } from "@/lib/odyssey/types";
import { SelectGroup, SelectValue } from "@radix-ui/react-select";
import React, { useState, useTransition } from "react";

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
  const [loading, startLoading] = useTransition();

  function getEpisodes() {
    startLoading(async () => {
      // const eps = getSeaso
    })
  }

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
              <SelectLabel>Temporada</SelectLabel>
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
      <div></div>
    </div>
  );
};
