import { ReadStream } from "fs";
import { Buffer } from "buffer";
import Bunny from "./utils/bunny";

export interface Config {
  private?: boolean;
  libraryId: number;
  libraryKey: string;
  pullZone: string;
  tokenSecurityKey: string;
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
    const bunny = new Bunny(
      config.libraryId,
      config.libraryKey,
      config.pullZone,
      config.tokenSecurityKey
    );

    return {
      isPrivate() {
        return config.private === true;
      },

      async getSignedUrl(file: StrapiFile) {
        const url = bunny.signUrl(file);
        return { url };
      },
      async upload(file: StrapiFile) {},

      async uploadStream(file: StrapiFile) {
        return await bunny.streamUpload(file);
      },

      async delete(file: StrapiFile) {
        return await bunny.deleteVideo(file);
      },
    };
  },
};
