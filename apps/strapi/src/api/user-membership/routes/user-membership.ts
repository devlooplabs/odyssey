/**
 * user-membership router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::user-membership.user-membership",
  {
    only: ["find", "findOne", "activate", "revoke"],
  }
);
