import { createHash } from "crypto";
import { OnSuccessPayload, Upload } from "tus-js-client";
import { StrapiFile } from "..";
import { Video } from "./types";
import { signBunnyUrl } from "./utils";

export default class Bunny {
  private pullZone: string;
  private libraryId: number;
  private libraryKey: string;
  private tokenSecurityKey: string;

  constructor(
    libraryId: number,
    libraryKey: string,
    pullZone: string,
    tokenSecurityKey: string
  ) {
    this.pullZone = pullZone;
    this.libraryId = libraryId;
    this.libraryKey = libraryKey;
    this.tokenSecurityKey = tokenSecurityKey;
  }

  private async createVideo(file: StrapiFile) {
    const url = `https://video.bunnycdn.com/library/${this.libraryId}/videos`;
    const options: RequestInit = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        AccessKey: this.libraryKey,
      },
      body: JSON.stringify({
        title: file.name,
      }),
    };

    const res = await fetch(url, options);
    const video = (await res.json()) as Video;

    file.provider_metadata = {
      guid: video.guid,
    };
    file.url = `https://${this.pullZone}.b-cdn.net/${video.guid}/play_480p.mp4`;
    file.previewUrl = `https://${this.pullZone}.b-cdn.net/${video.guid}/${video.thumbnailFileName}`;

    return video;
  }

  private tusUpload(file: StrapiFile, video: Video): Promise<OnSuccessPayload> {
    const expirationTime = Math.floor(Date.now() / 1000) + 12 * 60 * 60;
    const signatureString = `${this.libraryId}${this.libraryKey}${expirationTime}${video.guid}`;
    const signature = createHash("sha256")
      .update(signatureString)
      .digest("hex");

    return new Promise<OnSuccessPayload>((resolve, reject) => {
      const stream = file.stream!;
      const upload = new Upload(stream, {
        endpoint: "https://video.bunnycdn.com/tusupload",
        retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
        headers: {
          AuthorizationSignature: signature,
          AuthorizationExpire: expirationTime.toString(),
          VideoId: video.guid,
          LibraryId: this.libraryId.toString(),
        },
        metadata: {
          filetype: file.mime,
          title: file.name,
        },
        onError: (error) => reject(error),
        onProgress: (bytesSent, bytesTotal) => {},
        onSuccess: (payload) => resolve(payload),
      });

      upload.findPreviousUploads().then((previous) => {
        if (previous.length) {
          upload.resumeFromPreviousUpload(previous[0]);
        }

        upload.start();
      });
    });
  }

  async streamUpload(file: StrapiFile) {
    const video = await this.createVideo(file);
    return await this.tusUpload(file, video);
  }

  async deleteVideo(file: StrapiFile) {
    const url = `https://video.bunnycdn.com/library/${this.libraryId}/videos/${file.provider_metadata?.guid}`;
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        AccessKey: this.libraryKey,
      },
    };

    const res = await fetch(url, options);
    return await res.json();
  }

  signUrl(file: StrapiFile) {
    const url = signBunnyUrl(file.url, this.tokenSecurityKey);
    return url;
  }
}
