/**
 * user-membership controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::user-membership.user-membership",
  ({ strapi }) => ({
    async activate(ctx) {
      try {
        const { documentId } = ctx.params;

        const membership = await strapi
          .service("api::user-membership.user-membership")
          .activate(documentId, ctx.request.body);

        ctx.body = membership;
      } catch (err) {
        ctx.body = err;
      }
    },
    async revoke(ctx) {
      try {
        const { documentId } = ctx.params;

        const membership = await strapi
          .service("api::user-membership.user-membership")
          .revoke(documentId);

        ctx.body = membership;
      } catch (err) {
        ctx.body = err;
      }
    },
    async revokeGateway(ctx) {
      try {
        const { gatewayId } = ctx.params;

        const membership = await strapi
          .service("api::user-membership.user-membership")
          .revokeGateway(gatewayId);

        ctx.body = membership;
      } catch (err) {
        ctx.body = err;
      }
    },
  })
);
