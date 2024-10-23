"use client";

import { useEffect, useState, useTransition } from "react";
import { PlanCard } from "./components/plan-card";
import { H1 } from "@/components/typography/headings";
import { findPlans } from "@/app/actions";
import { Plan } from "@/app/actions/plans/types";
import { useAuth } from "@/components/auth/auth-context";

export default function PaymentPage() {
  const { isMember, user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [fetching, startFetching] = useTransition();

  useEffect(() => {
    startFetching(async () => {
      const res = await findPlans();
      if (res.data) setPlans(res.data);
    });
  }, []);

  return (
    <div className="container py-8 flex flex-col items-center gap-12">
      <H1>Escolha seu plano</H1>
      <div className="flex justify-center gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.documentId}
            plan={plan}
            currentPlan={user?.plan?.documentId === plan.documentId}
          />
        ))}
      </div>
    </div>
  );
}
