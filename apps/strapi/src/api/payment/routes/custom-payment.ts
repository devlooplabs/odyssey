export default {
  routes: [
    {
      method: "PUT",
      path: "/payments/confirm",
      handler: "api::payment.payment.confirm",
    },
    {
      method: "PUT",
      path: "/payments/revoke",
      handler: "api::payment.payment.revoke",
    },
  ],
};
