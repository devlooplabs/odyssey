"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Features } from "./plan-features";
import { P } from "@/components/typography/texts";
import { Plan } from "@/app/actions/plans/types";
import { Money } from "@/components/payment/money";
import { H2 } from "@/components/typography/headings";

interface PlanCardProps {
  plan: Plan;
  currentPlan?: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, currentPlan }) => {
  const router = useRouter();

  return (
    <Card
      key={plan.documentId}
      className="w-full p-8 space-y-8 border-none text-center bg-gradient-to-t from-primary/40 to-background"
    >
      <CardHeader>
        <CardTitle className="space-y-1">
          <P size="xl">{plan.name}</P>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <Features features={plan.features} />
        <div className="space-y-1">
          <H2 variant="gradient">
            <Money currency={plan.currency} value={plan.price} size="xl" /> /
            mês
          </H2>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-center">
        {currentPlan ? (
          <H2 variant="gradient" className="uppercase">
            Seu plano
          </H2>
        ) : (
          <Button
            size="lg"
            className="font-semibold text-md rounded-3xl"
            disabled={currentPlan}
            onClick={() => router.push(`/payment?planId=${plan.documentId}`)}
          >
            Assinar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
