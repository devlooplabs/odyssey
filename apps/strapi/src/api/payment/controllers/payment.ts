/**
 * payment controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::payment.payment",
  ({ strapi }) => ({
    async confirm(ctx) {
      await this.validateQuery(ctx);

      const { externalId, customerExternalId, data } = ctx.request.body;
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
          plan: payment.plan.documentId
        },
      });

      console.log(payment.plan);

      const confirmed = await strapi.documents("api::payment.payment").update({
        documentId: payment.documentId,
        data: {
          confirmed: true,
          customerExternalId: customerExternalId,
          data: data,
        },
      });

      const sanitized = await this.sanitizeOutput(confirmed, ctx);

      return this.transformResponse(sanitized);
    },

    async revoke(ctx) {
      await this.validateQuery(ctx);
      const { userId, customerExternalId } = ctx.request.body;

      const role = await strapi
        .documents("plugin::users-permissions.role")
        .findFirst({
          filters: {
            type: {
              $eq: "authenticated",
            },
          },
        });

      const payment = await strapi.documents("api::payment.payment").findFirst({
        filters: {
          customerExternalId: {
            $eq: customerExternalId,
          },
        },
        populate: ["user"],
      });

      await strapi.documents("plugin::users-permissions.user").update({
        documentId: payment.user.documentId,
        data: {
          member: false,
          role: role.documentId,
        },
      });

      return this.transformResponse({ success: true });
    },
  })
);
