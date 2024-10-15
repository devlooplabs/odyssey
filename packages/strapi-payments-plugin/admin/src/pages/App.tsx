import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
import { Gateways } from './gateways/Gateways';
import { PLUGIN_ID } from '../pluginId';
import { Layout } from '../components/Layout';
import { Subscriptions } from './Subscriptions';

const App = () => {
  return (
    <Layout>
      <Routes>
        {/* <Route index element={<HomePage />} /> */}
        <Route index element={<Gateways />} />
        {/* <Route path="/subscriptions" element={<Subscriptions />} /> */}
        <Route path="*" element={<Page.Error />} />
      </Routes>
    </Layout>
  );
};

export { App };
