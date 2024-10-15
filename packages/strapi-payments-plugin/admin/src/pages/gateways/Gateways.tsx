import { Flex } from '@strapi/design-system';
import { useState } from 'react';
import { GatewaysHeader } from './components/GatewaysHeader';
import { GatewaysList } from './components/GatewaysList';
import { Gateway } from './types';

export const Gateways = () => {
  const [gateways, setGateways] = useState<Gateway[]>([]);

  // Function to add a new gateway
  const add = () => {
    const newGateway: Gateway = {
      id: Date.now(),
      name: 'New Gateway',
      enabled: false,
      settings: null,
    };
    setGateways([...gateways, newGateway]);
  };

  // Function to update a gateway
  const update = (updatedGateway: Gateway) => {
    setGateways((prevGateways) =>
      prevGateways.map((gateway) => (gateway.id === updatedGateway.id ? updatedGateway : gateway))
    );
  };

  // Function to remove a gateway
  const remove = (id: number) => {
    setGateways((prevGateways) => prevGateways.filter((g) => g.id !== id));
  };

  return (
    <Flex direction="column">
      <GatewaysHeader add={add} />
      <GatewaysList gateways={gateways} onAdd={add} onRemove={remove} onUpdate={update} />
    </Flex>
  );
};
