export default {
  routes: [
    {
      method: "GET",
      path: "/course-lessons/:id/watch",
      handler: "api::course-lesson.course-lesson.watch",
    },
  ],
};
