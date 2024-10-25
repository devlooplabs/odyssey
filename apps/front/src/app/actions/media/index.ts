"use server";

import { getOdysseyClient } from "../client";
import { MediaContent, MediaContentType, OdysseyBaseResponse } from "../types";

function getContentUrl(content: MediaContent) {
  switch (content.type) {
    case MediaContentType.video:
      return `/podcasts/watch/${content.documentId}`;
    case MediaContentType.live:
      return `/lives`;
    default:
      return "/";
  }
}

export async function findFeaturedContent() {
  const client = getOdysseyClient();
  const url = `/api/media/featured`;
  const res = await client.get<OdysseyBaseResponse<MediaContent>>(url);

  return {
    ...res.data,
    data: res.data.data
      ? ({
          ...res.data.data,
          url: getContentUrl(res.data.data),
        } as MediaContent)
      : null,
  };
}
