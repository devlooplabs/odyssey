import { request, RequestOptions } from "https";
import { StrapiFile } from "../types";
import { BunnyStorageConfig } from "./types";
import { getFilePath } from "./utils";

export async function deleteFileFromStorage(
  file: StrapiFile,
  config: BunnyStorageConfig
) {
  const host = getHost(config);
  const path = getFilePath(file);
  const url = `https://${host}/${config.name}/${path}`;
  const options: RequestInit = {
    method: "DELETE",
    headers: {
      AccessKey: config.password
    }
  };
  return await fetch(url, options);
}

function getHost(config: BunnyStorageConfig) {
  const baseHost = "storage.bunnycdn.com";
  return `${config.region}.${baseHost}`;
}

export function uploadFileToStorage(
  file: StrapiFile,
  config: BunnyStorageConfig
) {
  return new Promise<any>((resolve, reject) => {
    const path = getFilePath(file);
    const options: RequestOptions = {
      method: "PUT",
      host: getHost(config),
      path: `/${config.name}/${path}`,
      headers: {
        AccessKey: config.password,
        "Content-Type": "application/octet-stream",
      },
    };

    const req = request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk.toString("utf8");
      });
      res.on("end", () => {
        if (res.statusCode === 201) {
          resolve(data);
        } else {
          reject(
            new Error(
              `Failed to upload file. Status: ${res.statusCode} Data: ${data}`
            )
          );
        }
      });
    });

    req.on("error", (error) => reject(error));

    if (file.stream) {
      file.stream.pipe(req);
    } else {
      req.write(file.buffer);
      req.end();
    }
  });
}
