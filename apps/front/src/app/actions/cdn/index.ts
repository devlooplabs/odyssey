"use server";

import qs from "qs";
import crypto from "crypto";
import { OdysseyVideoFile } from "../types";

const BUNNYCDN_TOKEN_SECURITY_KEY = process.env.BUNNYCDN_TOKEN_SECURITY_KEY!;
const BUNNYCDN_STREAM_LIBRARY_ID = process.env.BUNNYCDN_STREAM_LIBRARY_ID!;
const BUNNYCDN_TOKEN_EXPIRES_IN_SECONDS = parseInt(
  process.env.BUNNYCDN_TOKEN_EXPIRES_IN_SECONDS!
);

export async function getVideoFrameUrl(video: OdysseyVideoFile) {
  const expires =
    Math.floor(Date.now() / 1000) + BUNNYCDN_TOKEN_EXPIRES_IN_SECONDS;
  const token = crypto
    .createHash("sha256")
    .update(
      `${BUNNYCDN_TOKEN_SECURITY_KEY}${video.provider_metadata.guid}${expires}`
    )
    .digest("hex");

  const query = qs.stringify({
    token,
    expires,
    autoplay: true,
    loop: false,
    muted: false,
    preload: true,
    responsive: true,
  });

  return `https://iframe.mediadelivery.net/embed/${BUNNYCDN_STREAM_LIBRARY_ID}/${video.provider_metadata.guid}?${query}`;
}
