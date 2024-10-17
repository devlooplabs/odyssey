import { BunnyCdnConfig } from "@strapi/provider-upload-bunnycdn/dist/bunny/types";

export default ({ env }) => ({
  email: {
    config: {
      provider: "amazon-ses",
      providerOptions: {
        key: env("AWS_SES_KEY"),
        secret: env("AWS_SES_SECRET"),
        amazon: env("AWS_SES_URL")
      },
      settings: {
        defaultFrom: "no-reply@altalinguagem.tv",
        defaultReplyTo: "no-reply@altalinguagem.tv"
      }
    }
  },
  upload: {
    config: {
      provider: "bunnycdn",
      sizeLimit: 20 * 1024 * 1024 * 1024,
      providerOptions: {
        baseUrl: env("BUNNYCDN_BASEURL"),
        tokenSecurityKey: env("BUNNYCDN_TOKEN_SECURITY_KEY"),
        storage: {
          private: false,
          name: env("BUNNYCDN_STORAGE_NAME"),
          region: env("BUNNYCDN_STORAGE_REGION"),
          password: env("BUNNYCDN_STORAGE_PASSWORD"),
        },
        stream: {
          private: true,
          baseUrl: env("BUNNYCDN_STREAM_BASEURL"),
          libraryId: env("BUNNYCDN_STREAM_LIBRARY_ID"),
          libraryKey: env("BUNNYCDN_STREAM_LIBRARY_KEY"),
        },
      } as BunnyCdnConfig,
    },
  },
});
