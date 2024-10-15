"use server";

import { Odyssey } from "@/lib/odyssey/odyssey";
import { cookies } from "next/headers";

export async function getSerie(id: string) {
  const jwt = cookies().get("jwt")?.value;
  const odyssey = new Odyssey(jwt);
  const res = await odyssey.getSerie(id);
  return res.data;
}

export async function getSeries() {
  const jwt = cookies().get("jwt")?.value;
  const odyssey = new Odyssey(jwt);
  const res = await odyssey.getSeries();
  return res.data;
}

export async function getSerieEpisodes(serieId?: string, count?: number) {
  const jwt = cookies().get("jwt")?.value;
  const odyssey = new Odyssey(jwt);
  const res = await odyssey.getSerieEpisodes(serieId, count);
  return res.data;
}

export async function getSerieSeason(id: string) {
  const jwt = cookies().get("jwt")?.value;
  const odyssey = new Odyssey(jwt);
  const res = await odyssey.getSerieSeason(id);
  return res.data;
}

export async function getSerieSeasons(serieId?: string, count?: number) {
  const jwt = cookies().get("jwt")?.value;
  const odyssey = new Odyssey(jwt);
  const res = await odyssey.getSerieSeasons(serieId, count);
  return res.data;
}

export async function getEpisode(episodeId: string) {
  const jwt = cookies().get("jwt")?.value;
  const odyssey = new Odyssey(jwt);
  const res = await odyssey.getEpisode(episodeId);
  return res.data;
}

export async function getVideoIFrameUrl(videoId: string) {
  const url = `https://iframe.mediadelivery.net/embed/326578/${videoId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;
  return url;
}
