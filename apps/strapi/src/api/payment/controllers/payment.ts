/**
 * payment controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::payment.payment",
  ({ strapi }) => ({
    async confirm(ctx) {
      await this.validateQuery(ctx);

      const { externalId, data } = ctx.request.body;
      const payment = await strapi.documents("api::payment.payment").findFirst({
        filters: {
          externalId: {
            $eq: externalId,
          },
        },
        populate: {
          user: {
            fields: ["id"],
          },
          plan: {
            populate: ["role"],
          },
        },
      });

      await strapi.documents("plugin::users-permissions.user").update({
        documentId: payment.user.documentId,
        data: {
          member: true,
          role: payment.plan.role.documentId,
        },
      });

      const confirmed = await strapi.documents("api::payment.payment").update({
        documentId: payment.documentId,
        data: {
          confirmed: true,
          data: data,
        },
      });

      const sanitized = await this.sanitizeOutput(confirmed, ctx);

      return this.transformResponse(sanitized);
    },
  })
);
