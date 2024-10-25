"use server";

import qs from "qs";
import { getOdysseyClient } from "../client";
import { MediaContentType, MediaType, OdysseyFindResponse } from "../types";
import { Serie, SerieEpisode, SerieSeason } from "./types";

interface FindSeriesProps {
  count?: number;
}

export async function findSeries({ count }: FindSeriesProps) {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      populate: {
        thumbnail: true,
        seasons: true,
      },
    },
    { encodeValuesOnly: true }
  );
  const url = `/api/series?${query}`;
  const res = await client.get<OdysseyFindResponse<Serie[]>>(url);
  return {
    ...res.data,
    data: res.data.data
      ? res.data.data.map(
          (serie) => ({ ...serie, type: MediaType.serie }) as Serie
        )
      : null,
  };
}

interface FindSerieSeasonsProps {
  serieId?: string;
  limit?: number;
}

export async function findSerieSeasons({
  serieId,
  limit,
}: FindSerieSeasonsProps) {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      filters: serieId ? { serie: { id: { $eq: serieId } } } : undefined,
      sort: ["sequence"],
      populate: "thumbnail",
      pagination: limit ? { limit } : undefined,
    },
    { encodeValuesOnly: true }
  );

  const url = `/api/serie-seasons?${query}`;
  const res = await client.get<OdysseyFindResponse<SerieSeason[]>>(url);
  return res.data;
}

interface FindSerieEpisodesProps {
  serieId?: string;
  seasonId?: string;
  limit?: number;
}

export async function findSerieEpisodes({
  serieId,
  seasonId,
  limit,
}: FindSerieEpisodesProps) {
  const client = getOdysseyClient();
  const filters: any = {}; // Use an object to build the filters dynamically

  if (serieId) {
    filters.serie = { id: { $eq: serieId } };
  }

  if (seasonId) {
    filters.season = { documentId: { $eq: seasonId } };
  }

  const query = qs.stringify(
    {
      filters: Object.keys(filters).length ? filters : undefined,
      sort: ["sequence"],
      populate: "thumbnail",
      pagination: limit ? { limit } : undefined,
    },
    { encodeValuesOnly: true }
  );

  const url = `/api/serie-episodes?${query}`;
  const res = await client.get<OdysseyFindResponse<SerieEpisode[]>>(url);

  return {
    ...res.data,
    data: res.data.data
      ? res.data.data.map(
          (ep) => ({ ...ep, type: MediaContentType.video }) as SerieEpisode
        )
      : null,
  };
}

export async function watchSerieEpisode(id: string) {
  const client = getOdysseyClient();
  const url = `/api/serie-episodes/${id}/watch`;
  const res = await client.get<OdysseyFindResponse<SerieEpisode>>(url);
  return {
    ...res.data,
    data: res.data.data
      ? ({ ...res.data.data, type: MediaContentType.video } as SerieEpisode)
      : null,
  };
}

export async function findSerieEpisode(id: string) {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      populate: {
        thumbnail: true,
      },
    },
    { encodeValuesOnly: true }
  );

  const url = `/api/serie-episodes/${id}?${query}`;
  const res = await client.get<OdysseyFindResponse<SerieEpisode>>(url);
  return res.data;
}
