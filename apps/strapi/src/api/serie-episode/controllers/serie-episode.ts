/**
 * serie-episode controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::serie-episode.serie-episode",
  ({ strapi }) => ({
    async find(ctx) {
      const { data, meta } = await super.find(ctx);

      const credentials = ctx.state.auth.credentials;
      if (!credentials || credentials.role.type !== "member") {
        data.forEach((item) => {
          delete item.video;
        });
      }

      return { data, meta };
    },
    async findOne(ctx) {
      const response = await super.findOne(ctx);

      const credentials = ctx.state.auth.credentials;
      if (!credentials || credentials.role.type !== "member") {
        delete response.data.video;
      }

      return response;
    },
  })
);
