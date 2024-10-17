import Bunny from "./bunny";
import { BunnyCdnConfig } from "./bunny/types";
import { StrapiFile } from "./types";

export default {
  init(config: BunnyCdnConfig) {
    const bunny = new Bunny(config);

    return {
      // Privateness will be handled according to storage/stream configs.
      isPrivate() {
        return true;
      },

      async getSignedUrl(file: StrapiFile) {
        const url = bunny.signUrl(file);
        return { url };
      },

      async upload(file: StrapiFile) {
        return await bunny.upload(file);
      },

      async uploadStream(file: StrapiFile) {
        return await bunny.upload(file);
      },

      async delete(file: StrapiFile) {
        return await bunny.delete(file);
      },
    };
  },
};
