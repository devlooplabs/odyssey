import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alta Linguagem TV",
    short_name: "AltaLinguagem",
    description: "Alta Linguagem TV",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/images/logo-192x192.png",
        sizes: "192x192",
        type: "image/png",
      }
    ],
  };
}