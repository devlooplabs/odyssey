import {
  Main,
  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavSections,
  SubNavLink,
  Flex,
  Box,
} from '@strapi/design-system';

import { PLUGIN_ID } from '../pluginId';

export const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Main>
      <Flex alignItems={{ initial: 'flex-start' }}>
        <Box>
          <SubNav aria-label="Paymentes sub nav">
            <SubNavHeader label="Payments" />
            <SubNavSections>
              {/* <SubNavLink href={`/admin/plugins/${PLUGIN_ID}`} withBullet className="active">
                Transactions
              </SubNavLink>
              <SubNavLink href={`/admin/plugins/${PLUGIN_ID}/subscriptions`}>
                Subscriptions
              </SubNavLink> */}
              {/* <SubNavSection label="Settings"> */}
              <SubNavLink href={`/admin/plugins/${PLUGIN_ID}`} className="active">Gateways</SubNavLink>
              {/* </SubNavSection> */}
            </SubNavSections>
          </SubNav>
        </Box>
        <Box padding={8} style={{ flexGrow: 1 }}>
          {children}
        </Box>
      </Flex>
    </Main>
  );
};
