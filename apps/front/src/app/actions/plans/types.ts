export enum PaymentGateways {
  stripe = "stripe",
  mercadopago = "mercadopago",
}

export interface Plan {
  documentId: string;
  name: string;
  features?: string;
  valueText: string;
  valueDescription?: string;
  options: PlanPaymentOption[];
}

export interface PlanPaymentOption {
  documentId: string;
  gateway: PaymentGateways;
  data: any;
}
