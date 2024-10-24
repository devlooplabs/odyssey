export default ({ strapi }) => ({
  async subscribe(ctx) {
    const { documentId } = ctx.state.user;
    const { subscription } = ctx.request.body;
    try {
      await strapi.documents("plugin::users-permissions.user").update({
        documentId,
        data: {
          notifications: {
            subscription,
          },
        },
      });

      ctx.send({ ok: true });
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async unsubscribe(ctx) {
    const { documentId } = ctx.state.user;
    try {
      await strapi.documents("plugin::users-permissions.user").update({
        documentId,
        data: {
          notifications: null,
        },
      });

      ctx.send({ ok: true });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
