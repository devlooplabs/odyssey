import { JWT_COOKIE_NAME } from "@/lib/auth";
import axios from "axios";
import { cookies } from "next/headers";

export function getOdysseyClient(token?: string) {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ODYSSEY_URL,
  });

  instance.interceptors.response.use(null, (error) => {
    if (error.response && error.response.status < 500) {
      return Promise.resolve(error.response);
    }

    return Promise.reject(error);
  });

  const jwt = token || cookies().get(JWT_COOKIE_NAME)?.value;
  if (jwt) {
    instance.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  }

  return instance;
}
