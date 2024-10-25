"use server";

import qs from "qs";
import { getOdysseyClient } from "../client";
import {
  MediaContentType,
  OdysseyBaseResponse,
  OdysseyFindResponse,
} from "../types";
import { Live, LiveEpisode } from "./types";

export async function findCurrentLive() {
  const client = getOdysseyClient();
  const url = `/api/live`;
  const res = await client.get<OdysseyBaseResponse<Live>>(url);

  return res.data;
}

export async function findLiveEpisode(id: string) {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      populate: {
        thumbnail: true,
      },
    },
    { encodeValuesOnly: true }
  );
  const url = `/api/live-episodes/${id}?${query}`;
  const res = await client.get<OdysseyFindResponse<LiveEpisode>>(url);

  return {
    ...res.data,
    data: res.data.data
      ? ({ ...res.data.data, type: MediaContentType.video } as LiveEpisode)
      : null,
  };
}

export async function watchLiveEpisode(id: string) {
  const client = getOdysseyClient();
  const url = `/api/live-episodes/${id}/watch`;
  const res = await client.get<OdysseyFindResponse<LiveEpisode>>(url);
  return {
    ...res.data,
    data: res.data.data
      ? ({ ...res.data.data, type: MediaContentType.video } as LiveEpisode)
      : null,
  };
}

interface FindLiveEpisodesParams {
  limit?: number;
}

export async function findLiveEpisodes({ limit }: FindLiveEpisodesParams) {
  const client = getOdysseyClient();
  const filters: any = {};

  const query = qs.stringify(
    {
      filters: Object.keys(filters).length ? filters : undefined,
      sort: ["publishedAt:desc"],
      populate: ["thumbnail"],
      pagination: limit ? { limit } : undefined,
    },
    { encodeValuesOnly: true }
  );
  const url = `/api/live-episodes?${query}`;
  const res = await client.get<OdysseyFindResponse<LiveEpisode[]>>(url);
  return {
    ...res.data,
    data: res.data.data
      ? res.data.data.map(
          (ep) =>
            ({
              ...ep,
              type: MediaContentType.video,
              url: `/lives/watch/${ep.documentId}`,
            }) as LiveEpisode
        )
      : [],
  };
}