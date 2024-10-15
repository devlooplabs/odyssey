import { StrapiFile } from "@strapi/provider-upload-multiple";

export default ({ env }) => ({
  upload: {
    config: {
      provider: "multiple",
      sizeLimit: 5 * 1024 * 1024 * 1024,
      providerOptions: {
        selectProvider(file: StrapiFile) {
          if (file?.mime.startsWith("video/")) return "videosBunny";
          return "default";
        },
        providers: {
          default: {
            provider: "local",
          },
          videos: {
            provider: "vimeo",
            options: {
              clientId: "a8074fc3941a30b4dc2c3ffa877d67f8b62efc66",
              clientSecret:
                "7p+NAJT5m0jphhVqtrT2jyLmuxHQPxr996yO0yJ2Oq8sHDcd1h8Zzgh9A0M/vvN5fSb9UQCMDGmgcMDHucCTnQVzlODZomLG8OyCRpC8LKxqVX2AWiKoyuZaLKxtBVKF",
              accessToken: "caa350cb1cf9cfc95e7676b4b747bdfb",
            },
          },
          videosBunny: {
            provider: "bunnycdn",
            options: {
              private: true,
              libraryId: 326578,
              libraryKey: "a97e1ae9-bf13-48bd-a17049be96d6-9b15-416a",
              pullZone: "vz-148380a4-717",
              tokenSecurityKey: "3ca98933-41b0-4c32-9d51-301a1b104fe5",
            },
          },
        },
      },
    },
  },
});
