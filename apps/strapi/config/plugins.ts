import { BunnyCdnConfig } from "@strapi/provider-upload-bunnycdn/dist/bunny/types";

export default ({ env }) => ({
  upload: {
    config: {
      provider: "bunnycdn",
      sizeLimit: 20 * 1024 * 1024 * 1024,
      providerOptions: {
        baseUrl: "https://test-ual-mateus.b-cdn.net/",
        tokenSecurityKey: "3ca98933-41b0-4c32-9d51-301a1b104fe5",
        storage: {
          private: false,
          name: "plataforma",
          region: "br",
          password: "523393c2-26a6-4053-87b89dff7f18-827a-4b9c",
        },
        stream: {
          private: true,
          baseUrl: "https://vz-148380a4-717.b-cdn.net",
          libraryId: 326578,
          libraryKey: "a97e1ae9-bf13-48bd-a17049be96d6-9b15-416a",
        },
      } as BunnyCdnConfig,
    },
  },
});
