/**
 * course-lesson controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  "api::course-lesson.course-lesson",
  ({ strapi }) => ({
    async watch(ctx) {
      await this.validateQuery(ctx);
      const { id } = ctx.params;
      const lesson = await strapi
        .documents("api::course-lesson.course-lesson")
        .findOne({
          documentId: id,
          populate: ["thumbnail", "video"],
        });

      // Still sanitizes for security but adds video.
      let sanitized = (await this.sanitizeOutput(lesson, ctx)) as any;
      sanitized = {
        ...sanitized,
        video: lesson.video,
      };

      return this.transformResponse(sanitized);
    },
  })
);
