export default {
  routes: [
    {
      method: "PUT",
      path: "/membership/:documentId/activate",
      handler: "api::user-membership.user-membership.activate",
    },
    {
      method: "PUT",
      path: "/membership/:documentId/revoke",
      handler: "api::user-membership.user-membership.revoke",
    },
    {
      method: "PUT",
      path: "/membership/:gatewayId/revoke-gateway",
      handler: "api::user-membership.user-membership.revokeGateway",
    },
  ],
};
