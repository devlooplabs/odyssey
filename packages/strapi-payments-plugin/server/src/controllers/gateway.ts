export const gateway = {
  async find(ctx) {
    // try {
      return await strapi.plugin('payments').service('gateway').find(ctx.query);
    // } catch(err){
    //   ctx.throw(500, err);
    // }
  }
}