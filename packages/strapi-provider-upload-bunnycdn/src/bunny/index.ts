import { request, RequestOptions } from "https";
import { BunnyCdnConfig } from "./types";
import { getFilePath, signBunnyUrl } from "./utils";
import { StrapiFile } from "../types";
import { deleteVideoFromStream, uploadVideoToStream } from "./stream";
import { deleteFileFromStorage, uploadFileToStorage } from "./storage";

export default class Bunny {
  private config: BunnyCdnConfig;

  constructor(config: BunnyCdnConfig) {
    this.config = config;
  }

  async upload(file: StrapiFile) {
    if (file.mime.startsWith("video") && this.config.stream) {
      return await uploadVideoToStream(file, this.config.stream);
    }

    file.provider_metadata = {
      provider: "bunnycdn",
      type: "storage",
    };
    file.url = new URL(getFilePath(file), this.config.baseUrl).toString();

    return await uploadFileToStorage(file, this.config.storage);
  }

  async delete(file: StrapiFile) {
    if (file.mime.startsWith("video") && this.config.stream) {
      return await deleteVideoFromStream(file, this.config.stream);
    }

    return await deleteFileFromStorage(file, this.config.storage);
  }

  signUrl(file: StrapiFile) {
    if (
      this.config.tokenSecurityKey &&
      (this.config.storage.private || this.config.stream?.private)
    ) {
      const tokenAsPath =
        file.mime.startsWith("video") && !!this.config.stream?.private;
      return signBunnyUrl(file.url, this.config.tokenSecurityKey, tokenAsPath);
    }

    return file.url;
  }
}
