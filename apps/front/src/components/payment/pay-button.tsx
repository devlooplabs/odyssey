import React from "react";
import { isStripePaymentOption, PayWithStripe } from "./pay-with-stripe";
import { PlanPaymentOption } from "@/app/actions/plans/types";

interface PayButtonProps {
  option: PlanPaymentOption;
  pay: (option: PlanPaymentOption) => void;
  disabled?: boolean;
}

export const PayButton: React.FC<PayButtonProps> = ({
  option,
  pay,
  disabled,
}) => {
  if (isStripePaymentOption(option))
    return <PayWithStripe option={option} pay={pay} disabled={disabled} />;

  return null;
};
