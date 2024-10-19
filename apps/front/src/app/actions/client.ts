import { JWT_COOKIE_NAME } from "@/lib/auth";
import axios from "axios";
import { cookies } from "next/headers";

export function getOdysseyClient() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ODYSSEY_URL,
  });

  instance.interceptors.response.use(null, (error) => {
    if (error.response && error.response.status === 400) {
      return Promise.resolve(error.response);
    }

    return Promise.reject(error);
  });

  const token = cookies().get(JWT_COOKIE_NAME)?.value;
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return instance;
}
