import { OnSuccessPayload, Upload } from "tus-js-client";

export function TusUpload(
  uploadUrl: string,
  video: Buffer
): Promise<OnSuccessPayload> {
  return new Promise<OnSuccessPayload>((res, rej) => {
    const upload = new Upload(new Blob([video]), {
      uploadUrl,
      onError: (e) => rej(e),
      onSuccess: (data) => res(data),
    });

    upload.start();
  });
}
