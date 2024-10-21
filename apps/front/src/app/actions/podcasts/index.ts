import QueryString from "qs";
import { getOdysseyClient } from "../client";
import { MediaType, OdysseyFindResponse } from "../types";
import { Podcast } from "./types";

export async function findPodcasts() {
  const client = getOdysseyClient();
  const query = QueryString.stringify(
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
      : null,
  };
}
