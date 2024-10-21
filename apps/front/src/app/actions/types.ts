/* Base */
export interface OdysseyBaseResponse<T> {
  data: T | null;
  error?: OdysseyError;
}

export interface OdysseyError {
  status: number;
  name: string;
  message: string;
  details: unknown;
}

export interface OdysseyFindResponse<T> extends OdysseyBaseResponse<T> {
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/* Files */
export interface OdysseyFile {
  id: number;
  documentId: string;
  mime: string;
  url: string;
}

export interface OdysseyVideoFile extends OdysseyFile {
  provider_metadata: {
    guid: string;
  };
}

export interface OdysseyImageFile extends OdysseyFile {
  formats: OdysseyImageFormats;
}

export interface OdysseyImageFormats {
  large: OdysseyImageFormat;
  small: OdysseyImageFormat;
  medium: OdysseyImageFormat;
  thumbnail: OdysseyImageFormat;
}

export interface OdysseyImageFormat {
  url: string;
}

/* Media */
export enum MediaType {
  serie = "serie",
  podcast = "podcast",
}

export interface Media {
  id: number;
  documentId: string;
  type: MediaType;
  name: string;
  createdAt: string;
  publishedAt: string;
  description?: string;
  thumbnail?: OdysseyImageFile;
}

export enum MediaContentType {
  video = "video",
}

export interface MediaContent {
  id: number;
  documentId: string;
  media: MediaType;
  type: MediaContentType;
  createdAt: string;
  publishedAt: string;
  name: string;
  description?: string;
  thumbnail?: OdysseyImageFile;
}

export interface MediaVideo extends MediaContent {
  type: MediaContentType.video;
  video: OdysseyVideoFile;
}
