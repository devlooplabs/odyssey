import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Middleware } from "./middlewares";

export const withAuth: Middleware = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const routes = ["/payment"];

    if (routes.some((path) => pathname.startsWith(path))) {
      const jwt = request.cookies.get("jwt");
      if (!jwt) {
        const redirectUrl = request.nextUrl.pathname + request.nextUrl.search;
        const url = new URL(`/login`, request.url);
        url.searchParams.set("redirectUrl", redirectUrl);
        return NextResponse.redirect(url);
      }
    }

    return next(request, _next);
  };
};
