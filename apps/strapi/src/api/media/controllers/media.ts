import type { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async featured(ctx) {
    try {
      let content = null;
      const live = await strapi.service("api::live.live").find();
      if (live) {
        content = { ...live, type: "live" };
      }

      if (content === null) {
        const podcasts = await strapi
          .service("api::podcast-episode.podcast-episode")
          .find({
            pagination: { limit: 1 },
            sort: "publishedAt:desc",
            populate: ["thumbnail"],
          });

        if (podcasts.results?.length) {
          content = { ...podcasts.results[0], type: "video" };
        }
      }

      ctx.send({ data: content });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
