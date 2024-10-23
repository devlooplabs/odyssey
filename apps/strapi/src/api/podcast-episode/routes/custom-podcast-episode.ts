export default {
  routes: [
    {
      method: "GET",
      path: "/podcast-episodes/:id/watch",
      handler: "api::podcast-episode.podcast-episode.watch",
    }
  ],
};
