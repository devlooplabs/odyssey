import { PaymentGateways } from "../plans/types";

export interface ActivateMembershipParams {
  gateway: PaymentGateways;
  gatewayId?: string;
  gatewayData?: Record<string, any>;
}

export interface Membership {
  active: boolean;
  gateway: PaymentGateways;
  gatewayId?: string;
  gatewayData?: Record<string, any>;
}
