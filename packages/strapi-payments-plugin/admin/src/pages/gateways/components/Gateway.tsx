import {
  Accordion,
  Flex,
  Box,
  Button,
  SingleSelect,
  SingleSelectOption,
  Switch,
  Field,
  TextInput,
  Typography,
} from '@strapi/design-system';
import { Trash } from '@strapi/icons';
import { useState } from 'react';
import { Gateway as GatewayModel, GatewaySettings } from '../types';
import { StripeSettings } from './settings/StripeSettings';

export function Gateway({
  gateway,
  onUpdate,
  onRemove,
}: Readonly<{
  gateway: GatewayModel;
  onUpdate: (gateway: GatewayModel) => void;
  onRemove: (id: number) => void;
}>) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [errors, setErrors] = useState<string | null>(null);

  const toggleAccordion = () => {
    setExpanded((prev) => !prev);
  };

  const handleNameChange = (name: string) => {
    onUpdate({ ...gateway, name });
  };

  const handleDisplayNameChange = (displayName: string) => {
    onUpdate({ ...gateway, displayName });
  };

  const handleEnabledChange = (enabled: boolean) => {
    onUpdate({ ...gateway, enabled });
  };

  const handleSettingsChange = (settings: GatewaySettings) => {
    onUpdate({ ...gateway, settings });
  };

  const validateGateway = () => {
    let error = null;
    if (!gateway.name) {
      error = 'Name is required.';
    } else if (!gateway.settings) {
      error = 'Settings must be selected.';
    }
    setErrors(error);
    return !error;
  };

  // Individual save function
  const saveGateway = () => {
    if (validateGateway()) {
      // Integrate with Strapi backend here
      console.log('Gateway saved:', gateway);
      // Optionally, provide feedback to the user
    }
  };

  return (
    <Accordion.Item value="acc-01" expanded={expanded}>
      <Accordion.Header>
        <Accordion.Trigger description="Your personal information">
          {gateway.name}
        </Accordion.Trigger>
        <Accordion.Actions>
          <Switch
            checked={gateway.enabled}
            onCheckedChange={(checked: boolean) => handleEnabledChange(checked)}
            onLabel="Enabled"
            offLabel="Disabled"
            visibleLabels
          />
        </Accordion.Actions>
      </Accordion.Header>
      <Accordion.Content>
        <Flex direction="column" padding={4}>
          <Flex style={{ width: '100%' }} gap={4}>
            <TextInput
              placeholder="Gateway Name"
              value={gateway.name}
              onChange={(e: any) => handleNameChange(e.target.value)}
              error={errors && !gateway.name ? 'Name is required.' : ''}
              required
            />
            <TextInput
              placeholder="Gateway Display Name"
              value={gateway.displayName}
              onChange={(e: any) => handleDisplayNameChange(e.target.value)}
              error={errors && !gateway.name ? 'Name is required.' : ''}
              required
            />
            <SingleSelect
              label="Settings"
              placeholder="Select Gateway Type"
              value={gateway.settings?.__component || ''}
              onChange={(value: any) => {
                const settings: GatewaySettings = { __component: value };
                handleSettingsChange(settings);
              }}
              error={errors && !gateway.settings ? 'Settings must be selected.' : ''}
              required
            >
              <SingleSelectOption value="gateways.stripe">Stripe</SingleSelectOption>
              {/* <SingleSelectOption value="gateways.paypal">PayPal</SingleSelectOption> */}
            </SingleSelect>
          </Flex>
          <Box style={{ width: '100%' }}>
            {gateway.settings?.__component === 'gateways.stripe' && (
              <StripeSettings settings={gateway.settings} onChange={handleSettingsChange} />
            )}
            {errors && (
              <Typography variant="pi" textColor="danger600">
                {errors}
              </Typography>
            )}
            <Flex marginTop={4} style={{ width: '100%' }} gap={2}>
              <Button iconStart={<Trash />} onClick={() => onRemove(gateway.id)} variant="danger">
                Delete
              </Button>
              <Button onClick={saveGateway}>Save</Button>
            </Flex>
          </Box>
        </Flex>
      </Accordion.Content>
    </Accordion.Item>
  );
}
