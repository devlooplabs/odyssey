import { Box, TextInput } from '@strapi/design-system';
import { GatewaySettings } from '../../types';

export function StripeSettings({
  settings,
  onChange,
}: Readonly<{ settings: GatewaySettings; onChange: (settings: GatewaySettings) => void }>) {
  const onPublicKeyChange = (value: string) => {
    onChange({ ...settings, publicKey: value });
  };

  const onPrivateKeyChange = (value: string) => {
    onChange({ ...settings, privateKey: value });
  };

  const onWebhookSecretChange = (value: string) => {
    onChange({ ...settings, webhookSecret: value });
  };

  return (
    <Box paddingTop={4}>
      <TextInput
        placeholder="Public Key"
        value={settings.publicKey || ''}
        onChange={(e: any) => onPublicKeyChange(e.target.value)}
      />
      <TextInput
        placeholder="Private Key"
        value={settings.privateKey || ''}
        onChange={(e: any) => onPrivateKeyChange(e.target.value)}
      />
      <TextInput
        placeholder="Webhook Secret"
        value={settings.webhookSecret || ''}
        onChange={(e: any) => onWebhookSecretChange(e.target.value)}
      />
    </Box>
  );
}
