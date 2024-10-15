import { EmptyStateLayout, Button, Box, Accordion } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { Gateway } from './Gateway';
import { Gateway as GatewayModel } from '../types';

export function GatewaysList({
  gateways,
  onAdd,
  onUpdate,
  onRemove,
}: Readonly<{
  gateways: any[];
  onAdd: () => void;
  onUpdate: (gateway: GatewayModel) => void;
  onRemove: (id: number) => void;
}>) {
  return (
    <Box style={{ width: '100%' }}>
      {gateways?.length ? (
        <Accordion.Root>
          {gateways.map((gateway) => (
            <Gateway gateway={gateway} onRemove={onRemove} onUpdate={onUpdate} />
          ))}
        </Accordion.Root>
      ) : (
        <EmptyStateLayout
          content="You don't have any gateways configured yet..."
          action={
            <Button variant="secondary" startIcon={<Plus />} onClick={onAdd}>
              Configure your first gateway
            </Button>
          }
        />
      )}
    </Box>
  );
}
