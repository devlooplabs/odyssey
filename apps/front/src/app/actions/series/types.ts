import {
  Media,
  MediaContent,
  MediaContentType,
  MediaType,
  MediaVideo,
  OdysseyImageFile,
  OdysseyVideoFile,
} from "../types";

export interface Serie extends Media {
  type: MediaType.serie;
  seasons?: SerieSeason[];
}

export interface SerieSeason {
  id: number;
  documentId: string;
  name: string;
  sequence: number;
  description: string;
  publishedAt: string;
  thumbnail?: OdysseyImageFile;
  serie?: Serie;
  episodes?: SerieEpisode[];
}

export interface SerieEpisode extends MediaVideo {
  media: MediaType.serie;
  sequence: number;
}
