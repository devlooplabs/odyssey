import { NextMiddleware, NextResponse } from "next/server";

export type Middleware = (middleware: NextMiddleware) => NextMiddleware;

export function withMiddlewares(
  middlewares: Middleware[] = [],
  index = 0
): NextMiddleware {
  const current = middlewares[index];
  if (current) {
    const next = withMiddlewares(middlewares, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}
