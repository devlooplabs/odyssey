/**
 * live-episode controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  "api::live-episode.live-episode",
  ({ strapi }) => ({
    async watch(ctx) {
      await this.validateQuery(ctx);
      const { id } = ctx.params;
      const episode = await strapi
        .documents("api::live-episode.live-episode")
        .findOne({
          documentId: id,
          populate: ["thumbnail", "video"],
        });

      // Still sanitizes for security but adds video.
      let sanitized = (await this.sanitizeOutput(episode, ctx)) as any;
      sanitized = {
        ...sanitized,
        video: episode.video,
      };

      return this.transformResponse(sanitized);
    },
  })
);
