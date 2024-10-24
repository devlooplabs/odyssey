export default {
  routes: [
    {
      method: "PUT",
      path: "/notifications/subscribe",
      handler: "notifications.subscribe",
    },
    {
      method: "PUT",
      path: "/notifications/unsubscribe",
      handler: "notifications.unsubscribe",
    },
  ],
};
