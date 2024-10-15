import { ReadStream } from "fs";

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
  provider_metadata?: Record<string, unknown>;
  stream?: ReadStream;
  buffer?: Buffer;
}

export interface UploadProviderOptions {
  provider: string;
  options: unknown;
}

export interface InitOptions {
  selectProvider: (file: StrapiFile) => string;
  providers: Record<string, UploadProviderOptions>;
}

export interface UploadProvider {
  init: (options: unknown) => InitializedUploadProvider;
}

export interface SignedUrl {
  url: string;
}

export interface InitializedUploadProvider {
  upload: (file: StrapiFile) => unknown;
  uploadStream: (file: StrapiFile) => unknown;
  delete: (file: StrapiFile) => unknown;
  getSignedUrl?: (file: StrapiFile) => unknown;
  isPrivate?: (file: StrapiFile) => unknown;
}

// Loads the provider node module
function loadProvider(
  name: string,
  options: unknown
): InitializedUploadProvider {
  // Não deve ser uma má ideia ter um try/catch aqui né
  const provider = require(`@strapi/provider-upload-${name}`) as UploadProvider;
  return provider.init(options);
}

export default {
  init(options: InitOptions) {
    function getProviderForFile(file: StrapiFile) {
      const providerName = options.selectProvider(file);
      const providerOptionsName = Object.keys(options.providers).find(
        (key) => key === providerName
      );

      const providerOptions = options.providers[providerOptionsName!];

      const provider = loadProvider(
        providerOptions.provider,
        providerOptions.options
      );
      return provider;
    }

    return {
      async upload(file: StrapiFile) {
        const provider = getProviderForFile(file);
        return provider.upload(file);
      },
      async uploadStream(file: StrapiFile) {
        const provider = getProviderForFile(file);
        return provider.uploadStream(file);
      },
      async delete(file: StrapiFile) {
        const provider = getProviderForFile(file);
        return await provider.delete(file);
      },
      isPrivate() {
        return true;
      },
      async getSignedUrl(file: StrapiFile) {
        const provider = getProviderForFile(file);
        if (provider.getSignedUrl) return await provider.getSignedUrl(file);
        else return { url: file.url };
      },
    };
  },
};
