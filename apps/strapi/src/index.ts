import type { Core } from "@strapi/strapi";
import { sendNotification } from "./lib/notifications";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.server.httpServer.requestTimeout = 3 * 60 * 60 * 1000;

    strapi.db.lifecycles.subscribe({
      models: ["api::podcast-episode.podcast-episode"],
      // Aparentemente ele chama o afterCreate sempre que um modelo é publicado.
      async afterCreate(event) {
        console.log("-----------------CREATE--------------------");
        if (event.params.data?.publishedAt) {
          const BATCH_SIZE = 50;
          let page = 1;
          let users;

          const payload = { title: "Teste", message: "Teste " };
          do {
            users = await strapi
              .documents("plugin::users-permissions.user")
              .findMany({
                filters: {
                  notifications: {
                    $null: false,
                  },
                },
                page: page,
                pageSize: BATCH_SIZE,
              });

            page += 1;

            for (const user of users) {
              console.log(user);
              await sendNotification(user.notifications.subscription, payload);
            }
          } while (users.length === BATCH_SIZE);
        }

        console.log("-----------------CREATE--------------------");
      },
      async afterUpdate(event) {},
    });
  },
};
