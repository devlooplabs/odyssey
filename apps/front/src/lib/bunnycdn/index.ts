import { OdysseyVideoFile } from "../../app/actions/types";

export async function getVideoFrameUrl(video: OdysseyVideoFile) {
  return `https://iframe.mediadelivery.net/embed/326578/${video.provider_metadata.guid}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;
}
