"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { PayButton } from "@/components/payment/pay-button";
import { P } from "@/components/typography/texts";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plan, PlanPaymentOption } from "../actions/plans/types";
import { createPayment, findPlan } from "../actions";
import { Money } from "@/components/payment/money";

export default function Payment() {
  const planId = useSearchParams().get("planId");
  const [loading, startLoading] = useTransition();
  const [paying, startPaying] = useTransition();
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    startLoading(async () => {
      if (planId) {
        const res = await findPlan(planId);
        if (res.data) setPlan(res.data);
      }
    });
  }, [planId]);

  const pay = (option: PlanPaymentOption) => {
    startPaying(async () => {
      if (plan) {
        await createPayment(plan, option.gateway);
      }
    });
  };

  if (!plan) return null;

  return (
    <>
      <CardHeader>
        <CardTitle>Escolha como pagar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <P>
            Você está assinando o plano{" "}
            <span className="font-bold">{plan.name}</span> por
          </P>
          <Money currency={plan.currency} value={plan.price} size="xl" />
        </div>
        <div className="space-y-4">
          {plan.paymentOptions.map((option) => (
            <PayButton
              key={option.documentId}
              option={option}
              pay={pay}
              disabled={paying}
            />
          ))}
        </div>
      </CardContent>
    </>
  );
}
