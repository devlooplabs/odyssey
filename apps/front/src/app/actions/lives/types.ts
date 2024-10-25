import {
  MediaContent,
  MediaContentType,
  OdysseyImageFile,
  OdysseyVideoFile,
} from "../types";

export interface Live {
  name: string;
  description?: string;
  youtubeUrl: string;
}

export interface LiveEpisode extends MediaContent {
  type: MediaContentType.video;
  name: string;
  description?: string;
  thumbnail?: OdysseyImageFile;
  video: OdysseyVideoFile;
}
