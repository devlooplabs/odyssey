import type { Core, Schema } from '@strapi/strapi';

interface ComponentSchema extends Schema.Component {
  __filename__: string;
}

const stripe: ComponentSchema = {
  collectionName: 'components_gateways_stripes',
  uid: 'gateways.stripe',
  globalId: 'components.gateways.stripe',
  modelType: 'component',
  category: 'Gateways',
  modelName: 'stripe',
  __filename__: 'stripe.json',
  info: { displayName: 'Stripe' },
  attributes: {
    // documentId: {
    //   type: 'string',
    //   required: false
    // },
    publicKey: {
      type: 'string',
      required: true,
    },
    privateKey: {
      type: 'password',
      required: true,
      private: true,
    },
    webhookSecret: {
      type: 'password',
      required: true,
      private: true,
    },
  },
};

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.components['gateways.stripe'] = stripe;
};

export default register;
