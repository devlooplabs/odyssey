import { createHash } from "crypto";
import { StrapiFile } from "../types";
import { BunnyStreamConfig, BunnyVideo } from "./types";
import { OnSuccessPayload, Upload } from "tus-js-client";

export async function uploadVideoToStream(
  file: StrapiFile,
  config: BunnyStreamConfig
) {
  const video = await createVideo(file, config);
  return await tusUpload(file, video, config);
}

export async function deleteVideoFromStream(file: StrapiFile, config: BunnyStreamConfig) {
  const url = `https://video.bunnycdn.com/library/${config.libraryId}/videos/${file.provider_metadata?.guid}`;
  const options: RequestInit = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      AccessKey: config.libraryKey,
    },
  };
  const res = await fetch(url, options);
  return await res.json();
}

async function createVideo(file: StrapiFile, config: BunnyStreamConfig) {
  const url = `https://video.bunnycdn.com/library/${config.libraryId}/videos`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      AccessKey: config.libraryKey,
    },
    body: JSON.stringify({
      title: file.name,
    }),
  };

  const res = await fetch(url, options);
  const video = (await res.json()) as BunnyVideo;

  file.provider_metadata = {
    provider: "bunnycdn",
    type: "stream",
    guid: video.guid,
  };
  file.url = `${config.baseUrl}/${video.guid}/play_480p.mp4`;
  file.previewUrl = `${config.baseUrl}/${video.guid}/${video.thumbnailFileName}`;

  return video;
}

function tusUpload(
  file: StrapiFile,
  video: BunnyVideo,
  config: BunnyStreamConfig
) {
  const expirationTime = Math.floor(Date.now() / 1000) + 12 * 60 * 60;
  const signatureString = `${config.libraryId}${config.libraryKey}${expirationTime}${video.guid}`;
  const signature = createHash("sha256").update(signatureString).digest("hex");

  return new Promise<OnSuccessPayload>((resolve, reject) => {
    const stream = file.stream!;
    const upload = new Upload(stream, {
      endpoint: "https://video.bunnycdn.com/tusupload",
      retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
      headers: {
        AuthorizationSignature: signature,
        AuthorizationExpire: expirationTime.toString(),
        VideoId: video.guid,
        LibraryId: config.libraryId.toString(),
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
