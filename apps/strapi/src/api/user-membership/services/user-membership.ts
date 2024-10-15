/**
 * user-membership service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::user-membership.user-membership",
  ({ strapi }) => ({
    async activate(documentId, body) {
      const user = await strapi
        .documents("plugin::users-permissions.user")
        .findOne({
          documentId: documentId,
          populate: ["membership"],
        });

      await strapi.documents("plugin::users-permissions.user").update({
        documentId: user.documentId,
        data: {
          role: 4,
        },
      });

      const data = {
        user: documentId,
        active: true,
        gateway: body.gateway,
        gatewayId: body.gatewayId,
        gatewayData: body.gatewayData,
      };

      let membership;
      if (!user.membership) {
        membership = await strapi
          .documents("api::user-membership.user-membership")
          .create({
            data: data,
          });
      } else {
        membership = await strapi
          .documents("api::user-membership.user-membership")
          .update({
            documentId: user.membership.documentId,
            data: data,
          });
      }

      return membership;
    },

    async revoke(documentId) {
      const user = await strapi
        .documents("plugin::users-permissions.user")
        .findOne({
          documentId: documentId,
          populate: ["membership"],
        });

      if (!user.membership) return {};

      const membership = await strapi
        .documents("api::user-membership.user-membership")
        .update({
          documentId: user.membership.documentId,
          data: {
            active: false,
          },
        });

      await strapi.documents("plugin::users-permissions.user").update({
        documentId: user.documentId,
        data: {
          role: 1,
        },
      });

      return membership;
    },

    async revokeGateway(gatewayId) {
      let membership = await strapi.db
        .query("api::user-membership.user-membership")
        .findOne({
          where: {
            gatewayId: gatewayId,
          },
        });

      if (!membership) return {};

      membership = await strapi
        .documents("api::user-membership.user-membership")
        .update({
          documentId: membership.documentId,
          data: {
            active: false,
          },
        });

      await strapi.documents("plugin::users-permissions.user").update({
        documentId: membership.user,
        data: {
          role: 1,
        },
      });

      return membership;
    },
  })
);
