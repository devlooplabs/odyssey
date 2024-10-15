import { ReadStream } from "fs";
import Vimeo from "./utils/vimeo";
import { Buffer } from "buffer";

export interface Config {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  folderId?: string;
  premium?: boolean;
}

export interface StrapiFile {
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: Record<string, unknown>;
  hash: string;
  ext?: string;
  mime: string;
  size: number;
  sizeInBytes: number;
  url: string;
  previewUrl?: string;
  path?: string;
  provider?: string;
  provider_metadata?: Record<string, any>;
  stream?: ReadStream;
  buffer?: Buffer;
}

export default {
  init(config: Config) {
    const client = new Vimeo(
      config.clientId,
      config.clientSecret,
      config.accessToken
    );

    return {
      async upload(file: StrapiFile) {},

      async uploadStream(file: StrapiFile) {
        return await client.uploadVideo(file);
      },

      async delete(file: StrapiFile) {
        return await client.deleteVideo(file);
      },
    };
  },
};
