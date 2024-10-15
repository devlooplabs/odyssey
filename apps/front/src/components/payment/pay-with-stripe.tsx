import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { PaymentGateways, Plan, PlanPaymentOption } from "@/lib/odyssey/types";
import { paySubscription } from "@/lib/odyssey/payments";

interface StripePaymentOption extends PlanPaymentOption {
  gateway: PaymentGateways.stripe;
  data: {
    price: string;
  };
}

export function isStripePaymentOption(
  option: PlanPaymentOption
): option is StripePaymentOption {
  return option.gateway === PaymentGateways.stripe;
}

interface PayWithStripeProps {
  option: StripePaymentOption;
  pay: (option: PlanPaymentOption) => void;
  disabled?: boolean;
}

export const PayWithStripe: React.FC<PayWithStripeProps> = ({
  option,
  pay,
  disabled,
}) => {
  return (
    <Button onClick={() => pay(option)} disabled={disabled}>
      Pagar com Stripe
    </Button>
  );
};
