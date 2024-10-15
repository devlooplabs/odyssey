import { Vimeo as VimeoClient } from "@vimeo/vimeo";
import { Upload, OnSuccessPayload } from "tus-js-client";
import { StrapiFile } from "..";

export default class Vimeo {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string;
  private client: VimeoClient;

  constructor(clientId: string, clientSecret: string, accessToken: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accessToken = accessToken;
    this.client = new VimeoClient(
      this.clientId,
      this.clientSecret,
      this.accessToken
    );
  }

  private performTusUpload(
    file: StrapiFile,
    uploadUrl: string
  ): Promise<OnSuccessPayload> {
    return new Promise<OnSuccessPayload>((resolve, reject) => {
      const stream = file.stream!;
      const upload = new Upload(stream, {
        uploadUrl: uploadUrl,
        uploadSize: file.sizeInBytes,
        retryDelays: [0, 1000, 3000, 5000],
        onError: (error) => reject(error),
        onSuccess: (payload) => resolve(payload),
      });

      upload.start();
    });
  }

  private createTusUpload(file: StrapiFile) {
    return new Promise<any>((resolve, reject) => {
      this.client.request(
        {
          path: "/me/videos?fields=uri,name,upload,link,files",
          method: "POST",
          query: {
            upload: { approach: "tus", size: file.sizeInBytes },
          },
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
  }

  async uploadVideo(file: StrapiFile) {
    const response = await this.createTusUpload(file);
    file.url = response.link;
    file.provider_metadata = {
      uri: response.uri,
    };
    const payload = await this.performTusUpload(file, response.upload.upload_link);
    return payload;
  }

  deleteVideo(file: StrapiFile) {
    return new Promise<any>((resolve, reject) => {
      if (!file.provider_metadata || !file.provider_metadata.uri) {
        resolve({});
      } else {
        this.client.request(
          {
            method: "DELETE",
            path: file.provider_metadata!.uri,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      }
    });
  }
}
