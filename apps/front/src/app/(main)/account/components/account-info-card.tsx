import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountChangePasswordDialog } from "./account-change-password-dialog";
import { User } from "@/app/actions/auth/types";
import { NotificationsToggle } from "./notifications-toggle";

interface AccountInfoCardProps {
  user: User;
}

export const AccountInfoCard: React.FC<AccountInfoCardProps> = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 divide-y">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">{user.email}</span>
            </div>
            <div className="flex flex-col space-y-4 items-end">
              <AccountChangePasswordDialog />
              <NotificationsToggle />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
