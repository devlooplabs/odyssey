export default {
  routes: [
    {
      method: "GET",
      path: "/live-episodes/:id/watch",
      handler: "api::live-episode.live-episode.watch",
    },
  ],
};
