"use client";

import { useAuth } from "@/components/auth/auth-context";
import { AccountInfoCard } from "./components/account-info-card";
import { AccountSubscriptionCard } from "./components/account-subscription-card";

export default function Page() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="container space-y-4">
      <AccountInfoCard user={user} />
      <AccountSubscriptionCard user={user} />
      {/* <AccountNotificationsCard user={user!} /> */}
    </div>
  );
}
