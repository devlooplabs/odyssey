import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { User } from "@/app/actions/auth/types";
import { Badge } from "@/components/ui/badge";
import { P } from "@/components/typography/texts";
import { Money } from "@/components/payment/money";
import { Button } from "@/components/ui/button";

interface AccountSubscriptionCardProps {
  user: User;
}

export const AccountSubscriptionCard: React.FC<AccountSubscriptionCardProps> = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          Assinatura{" "}
          {user?.plan && user.member && <Badge>Plano {user.plan.name}</Badge>}
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
  );
};
