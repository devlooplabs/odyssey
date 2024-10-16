export const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure:
    process.env.NODE_ENV === "production" &&
    process.env.HOST !== "beta.ual.devloop.me",
};

export enum RoleTypes {
  public = "public",
  authenticated = "authenticated",
  member = "member",
}