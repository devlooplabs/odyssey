"use client";

import { useEffect, useState, useTransition } from "react";
import { PlanCard } from "./components/plan-card";
import { Plan } from "@/lib/odyssey/types";
import { H1 } from "@/components/typography/headings";
import { getPlans } from "@/lib/odyssey/plans";

export default function PaymentPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [fetching, startFetching] = useTransition();

  useEffect(() => {
    startFetching(async () => {
      const plans = await getPlans();
      if (plans) setPlans(plans);
    })
  }, []);

  return (
    <div className="container py-8 flex flex-col items-center gap-8">
      <H1>Escolha seu plano</H1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan.documentId} plan={plan} />
        ))}
      </div>
    </div>
  );
}
