export default [
  {
    method: 'GET',
    path: '/gateways/find',
    handler: 'gateway.find',
    config: {
      policies: [],
      auth: false,
    },
  },
];
