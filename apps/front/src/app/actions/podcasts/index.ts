"use server";

import qs from "qs";
import { getOdysseyClient } from "../client";
import { MediaContentType, MediaType, OdysseyBaseResponse, OdysseyFindResponse } from "../types";
import { Podcast, PodcastEpisode } from "./types";
import { getVideoFrameUrl } from "../cdn";

interface FindPodcastsParams {
  limit?: number;
}

export async function findPodcasts({ limit }: FindPodcastsParams) {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      populate: {
        thumbnail: true,
      },
      pagination: limit ? { limit } : null,
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

  let res = await client.get<OdysseyBaseResponse<PodcastEpisode>>(
    `/api/podcast-episodes/${id}/watch`
  );

  // If user doesn't have access to watch, fetch the episode metadata.
  if (res.status === 403) {
    res = await client.get<OdysseyBaseResponse<PodcastEpisode>>(
      `/api/podcast-episodes/${id}?populate=thumbnail`
    );
    return { ...res.data, hasAccess: false };
  }

  if (res.data.data) {
    res.data.data.type = MediaContentType.video;
    res.data.data.video.provider_metadata.url = await getVideoFrameUrl(
      res.data.data.video
    );
  }

  return { ...res.data, hasAccess: true };
}
