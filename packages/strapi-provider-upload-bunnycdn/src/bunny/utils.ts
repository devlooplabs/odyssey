import { createHash } from "crypto";
import { StrapiFile } from "../types";

export function getFilePath(file: StrapiFile) {
  const path = file.path ? `${file.path}/` : '';
  return `${path}${file.hash}${file.ext}`;
}

export function signBunnyUrl(
  originalUrl: string,
  securityKey: string,
  tokenAsPath: boolean = false,
  expirationTime: number = 900,
  userIp?: string,
  pathAllowed?: string,
  countriesAllowed?: string,
  countriesBlocked?: string
): string {
  const expires = Math.floor(Date.now() / 1000) + expirationTime;
  const urlWithCountries = addCountries(
    originalUrl,
    countriesAllowed,
    countriesBlocked
  );
  const parsedUrl = new URL(urlWithCountries);

  let signaturePath =
    pathAllowed && pathAllowed !== ""
      ? pathAllowed
      : decodeURIComponent(parsedUrl.pathname);

  const parameters = parsedUrl.searchParams;

  if (pathAllowed && pathAllowed !== "") {
    parameters.set("token_path", signaturePath);
  }

  // Sort parameters
  const sortedParams = new URLSearchParams(
    Array.from(parameters.entries()).sort(([keyA], [keyB]) =>
      keyA.localeCompare(keyB)
    )
  );

  let parameterData = "";
  let parameterDataUrl = "";

  sortedParams.forEach((value, key) => {
    if (value === "") return;
    parameterData += parameterData ? `&${key}=${value}` : `${key}=${value}`;
    parameterDataUrl += `&${key}=${encodeURIComponent(value)}`;
  });

  const hashableBase = `${securityKey}${signaturePath}${expires}${userIp ?? ""}${parameterData}`;
  const token = createHash("sha256")
    .update(hashableBase)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  if (tokenAsPath) {
    return `${parsedUrl.protocol}//${parsedUrl.host}/bcdn_token=${token}${parameterDataUrl}&expires=${expires}${parsedUrl.pathname}`;
  } else {
    return `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}?token=${token}${parameterDataUrl}&expires=${expires}`;
  }
}

function addCountries(
  url: string,
  countriesAllowed?: string,
  countriesBlocked?: string
): string {
  let modifiedUrl = url;

  if (countriesAllowed) {
    const urlObj = new URL(modifiedUrl);
    modifiedUrl += `${urlObj.search === "" ? "?" : "&"}token_countries=${countriesAllowed}`;
  }

  if (countriesBlocked) {
    const urlObj = new URL(modifiedUrl);
    modifiedUrl += `${urlObj.search === "" ? "?" : "&"}token_countries_blocked=${countriesBlocked}`;
  }

  return modifiedUrl;
}
