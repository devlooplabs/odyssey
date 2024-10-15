export interface GatewaySettings {
  __component: 'gateways.stripe' | 'gateways.paypal';
  [key: string]: any; // Additional settings specific to the gateway
}

export interface Gateway {
  id: number;
  name: string;
  displayName?: string;
  enabled: boolean;
  settings: GatewaySettings | null;
}
