import { Typography, Button, Box, Flex } from '@strapi/design-system';
import { Plus } from '@strapi/icons';

export function GatewaysHeader({ add }: Readonly<{ add: () => void }>) {
  return (
    <Box marginBottom={4} style={{ width: '100%' }}>
      <Flex justifyContent="space-between">
        <Box>
          <Typography variant="alpha">Gateways</Typography>
        </Box>
        <Box>
          <Button startIcon={<Plus />} onClick={add}>Add new Gateway</Button>
        </Box>
      </Flex>
    </Box>
  );
}
