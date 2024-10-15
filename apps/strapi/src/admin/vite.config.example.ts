import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
        'strapi-payments-plugin': '../../../../packages/strapi-payments-plugin/admin/src'
      },
    },
  });
};
