import { Vimeo } from "@vimeo/vimeo";
import axios, { AxiosResponse } from "axios";
import { TusUpload } from "./tus";
import { OnSuccessPayload } from "tus-js-client";

function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default class VimeoClient {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string;
  public vimeoClient: any;

  constructor(clientId: string, clientSecret: string, accessToken: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accessToken = accessToken;
    this.vimeoClient = new Vimeo(
      this.clientId,
      this.clientSecret,
      this.accessToken
    );
  }

  uploadFromLink(
    params: {
      link?: string;
      name?: string;
      description?: string;
      folder?: string;
    } = {
      link: "http://link/video.mp4",
      name: "video name",
      description: "video desc",
      folder: "",
    }
  ): Promise<AxiosResponse<any>> {
    return new Promise<AxiosResponse<any>>((resolve, reject) => {
      const { link, name, description, folder } = params;

      axios
        .post(
          "https://api.vimeo.com/me/videos",
          {
            upload: {
              approach: "pull",
              link: link || undefined,
              size: undefined,
            },
            name: name || undefined,
            description: description || undefined,
          },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        )
        .then((res) => {
          const vimeoVideoID = res.data.uri.split("/")[2];
          if (folder) {
            axios
              .put(
                `https://api.vimeo.com/me/projects/${folder}/videos/${vimeoVideoID}`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                  },
                }
              )
              .then((response) => {
                resolve(response);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            resolve(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  uploadFromBinary(params: {
    video: Buffer;
    name?: string;
    description?: string;
    folderId?: string;
  }): Promise<OnSuccessPayload> {
    return new Promise<OnSuccessPayload>((resolve, reject) => {
      const { video, name, description, folderId } = params;

      if (!video) {
        return reject(new Error("Video buffer is required"));
      }

      axios
        .post(
          "https://api.vimeo.com/me/videos",
          {
            upload: {
              approach: "tus",
              size: video.byteLength,
            },
            name: name || undefined,
            description: description || undefined,
            folder_uri: folderId ? `/folders/${folderId}` : undefined,
          },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        )
        .then((res) => {
          TusUpload(res.data.upload.upload_link, video)
            .then((uploadRes) => {
              resolve(uploadRes);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getFromId(id: string): Promise<AxiosResponse<any>> {
    return new Promise<AxiosResponse<any>>((resolve, reject) => {
      const interval = setInterval(() => {
        axios
          .get(`https://api.vimeo.com${id}`, {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          })
          .then((response) => {
            if (response.data.status === "available") {
              const availableRenditions = ["360p", "540p", "720p", "1080p"];
              const files = response.data.files || [];

              if (
                files.some((file: any) =>
                  availableRenditions.includes(file.rendition)
                )
              ) {
                clearInterval(interval);
                sleep(10000).then(() => {
                  resolve(response);
                });
              }
            }
          })
          .catch((err) => {
            clearInterval(interval);
            reject(err);
          });
      }, 5000);
    });
  }
}
