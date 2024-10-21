import { User } from "../auth/types";
import { PaymentGateways } from "../plans/types";

export interface Payment {
  user: User;
  gateway: PaymentGateways;
  externalId: string;
  data?: any;
  confirmed?: boolean;
  url: string;
}
