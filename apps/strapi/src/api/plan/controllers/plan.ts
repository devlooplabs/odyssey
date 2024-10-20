/**
 * plan controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::plan.plan",
  ({ strapi }) => ({
    // async activate(ctx) {
    //   await this.validateQuery(ctx);
    // }
  })
);
