"use client";

import { useAuth } from "@/components/auth/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangePasswordDialog } from "./components/change-password-dialog";
import { redirect } from "next/navigation";
import { P } from "@/components/typography/texts";
import { Money } from "@/components/payment/money";
import { PlanFeatures } from "../plans/components/plan-features";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { user } = useAuth();

  return (
    <div className="container space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 divide-y">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold">{user?.email}</span>
              </div>
              <div>
                <ChangePasswordDialog />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            Assinatura{" "}
            {user?.plan && user.member && (
              <Badge>Plano {user.plan.name}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          {user?.plan && (
            <>
              <div>
                <P>
                  Valor:{" "}
                  <b>
                    <Money
                      currency={user?.plan.currency}
                      value={user.plan.price}
                    />
                  </b>
                </P>
                <P>Iniciou em:</P>
                <P>Próxima cobrança:</P>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(
                      process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  Gerenciar Assinatura
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
