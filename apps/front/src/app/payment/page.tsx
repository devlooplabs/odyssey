"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { PayButton } from "@/components/payment/pay-button";
import { P } from "@/components/typography/texts";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paySubscription } from "@/lib/odyssey/payments";
import { getPlan } from "@/lib/odyssey/plans";
import { Plan, PlanPaymentOption } from "@/lib/odyssey/types";

export default function Payment() {
  const planId = useSearchParams().get("planId");
  const [loading, startLoading] = useTransition();
  const [paying, startPaying] = useTransition();
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    startLoading(async () => {
      if (planId) {
        const plan = await getPlan(planId);
        setPlan(plan);
      }
    });
  }, [planId]);

  const pay = (option: PlanPaymentOption) => {
    startPaying(async () => {
      if (plan) {
        await paySubscription(option.gateway, plan);
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
