"use client";

import { useAuth } from "@/components/auth/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangePasswordDialog } from "./components/change-password-dialog";

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
            <div className="flex items-center gap-4">
              <span className="font-semibold">{user?.email}</span>
              <ChangePasswordDialog />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assinatura</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div>
              <span>
                Plano{" "}
                <span className="font-semibold text-primary">
                  {user?.plan.name}
                </span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
