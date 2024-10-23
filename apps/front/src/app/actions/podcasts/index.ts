"use server";

import qs from "qs";
import { getOdysseyClient } from "../client";
import { MediaContentType, MediaType, OdysseyFindResponse } from "../types";
import { Podcast, PodcastEpisode } from "./types";

export async function findPodcasts() {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      populate: {
        thumbnail: true,
      },
    },
    { encodeValuesOnly: true }
  );
  const url = `/api/podcasts?${query}`;
  const res = await client.get<OdysseyFindResponse<Podcast[]>>(url);
  return {
    ...res.data,
    data: res.data.data
      ? res.data.data.map(
          (serie) => ({ ...serie, type: MediaType.podcast }) as Podcast
        )
      : [],
  };
}

export async function findPodcast(id: string) {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      populate: {
        thumbnail: true,
      },
    },
    { encodeValuesOnly: true }
  );
  const url = `/api/podcasts/${id}?${query}`;
  const res = await client.get<OdysseyFindResponse<Podcast>>(url);
  return {
    ...res.data,
    data: res.data.data
      ? ({ ...res.data.data, type: MediaType.podcast } as Podcast)
      : null,
  };
}

interface FindPodcastEpisodesParams {
  limit?: number;
  podcast?: string;
}

export async function findPodcastEpisodes({
  podcast,
  limit,
}: FindPodcastEpisodesParams) {
  const client = getOdysseyClient();

  const filters: any = {};
  if (podcast) {
    filters.podcast = { documentId: { $eq: podcast } };
  }

  const query = qs.stringify(
    {
      filters: Object.keys(filters).length ? filters : undefined,
      sort: ["publishedAt:desc"],
      populate: ["thumbnail", "podcast"],
      pagination: limit ? { limit } : undefined,
    },
    { encodeValuesOnly: true }
  );
  const url = `/api/podcast-episodes?${query}`;
  const res = await client.get<OdysseyFindResponse<PodcastEpisode[]>>(url);
  return {
    ...res.data,
    data: res.data.data
      ? res.data.data.map(
          (ep) =>
            ({
              ...ep,
              type: MediaContentType.video,
              url: `/podcasts/watch/${ep.documentId}`,
            }) as PodcastEpisode
        )
      : [],
  };
}

export async function findPodcastEpisode(id: string) {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      populate: {
        thumbnail: true,
      },
    },
    { encodeValuesOnly: true }
  );
  const url = `/api/podcast-episodes/${id}?${query}`;
  const res = await client.get<OdysseyFindResponse<PodcastEpisode>>(url);

  return {
    ...res.data,
    data: res.data.data
      ? ({ ...res.data.data, type: MediaContentType.video } as PodcastEpisode)
      : null,
  };
}

export async function watchPodcastEpisode(id: string) {
  const client = getOdysseyClient();
  const url = `/api/podcast-episodes/${id}/watch`;
  const res = await client.get<OdysseyFindResponse<PodcastEpisode>>(url);
  return {
    ...res.data,
    data: res.data.data
      ? ({ ...res.data.data, type: MediaContentType.video } as PodcastEpisode)
      : null,
  };
}
