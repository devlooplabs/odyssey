export default {
  routes: [
    {
      method: "GET",
      path: "/serie-episodes/:id/watch",
      handler: "api::serie-episode.serie-episode.watch",
    },
  ],
};
