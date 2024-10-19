"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { PayButton } from "@/components/payment/pay-button";
import { P } from "@/components/typography/texts";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plan, PlanPaymentOption } from "../actions/plans/types";
import { findPlan, payMembership } from "../actions";

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
        await payMembership(option.gateway, plan);
      }
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Escolha como pagar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <P>
            Você está assinando o plano{" "}
            <span className="font-bold">{plan?.name}</span> por
          </P>
          <P size="lg">{plan?.valueText}/mês</P>
        </div>
        <div className="space-y-4">
          {plan?.options.map((option) => (
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
