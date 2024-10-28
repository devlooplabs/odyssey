/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "localhost",
      "strapi.beta.ual.devloop.me",
      "test-ual-mateus.b-cdn.net",
    ],
  },
};

export default nextConfig;
