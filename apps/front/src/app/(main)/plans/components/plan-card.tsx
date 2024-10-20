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

interface PlanCardProps {
  plan: Plan;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
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
          <Money currency={plan.currency} value={plan.price} size="xl" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-center">
        <Button
          size="lg"
          className="font-semibold text-md rounded-3xl"
          onClick={() => router.push(`/payment?planId=${plan.documentId}`)}
        >
          Assinar
        </Button>
      </CardFooter>
    </Card>
  );
};
