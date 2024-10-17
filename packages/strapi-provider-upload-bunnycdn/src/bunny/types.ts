export interface BunnyVideo {
  videoLibraryId: number;
  guid: string;
  title: string;
  dateUploaded: string;
  thumbnailFileName: string;
}

export interface BunnyCdnConfig {
  baseUrl: string;
  storage: BunnyStorageConfig;
  stream?: BunnyStreamConfig;
  tokenSecurityKey?: string;
}

export interface BunnyStorageConfig {
  private?: boolean;
  name: string;
  region: string;
  password: string;
}

export interface BunnyStreamConfig {
  private?: boolean;
  baseUrl: string;
  libraryId: number;
  libraryKey: string;
}