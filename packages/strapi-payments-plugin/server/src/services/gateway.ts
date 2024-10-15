export const gateway = ({ strapi }) => ({
  async find(query) {
    let result = await strapi.documents('plugin::payments.payment-gateway').findMany({
      filters: {
        enabled: {
          $eq: true,
        },
      },
      populate: ['settings'],
    });

    return result.map((gat) => ({
      ...gat,
      settings: gat.settings.map((settings) => {
        if (settings.__component === 'gateways.stripe') {
          return {
            __component: settings.__component,
            id: settings.id,
            publicKey: settings.publicKey,
          };
        }
      }),
    }));
  },
});
