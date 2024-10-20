export enum PaymentGateways {
  stripe = "stripe",
  mercadopago = "mercadopago",
}

export interface Plan {
  documentId: string;
  name: string;
  features: string;
  currency: string;
  price: number;
  paymentOptions: PlanPaymentOption[];
}

export interface PlanPaymentOption {
  documentId: string;
  gateway: PaymentGateways;
  data: any;
}
