export default {
  routes: [
    {
      method: "PUT",
      path: "/payments/confirm",
      handler: "api::payment.payment.confirm"
    },
  ],
};
