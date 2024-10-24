"use client";

import React, { useState, useTransition } from "react";
import { User } from "@/app/actions/auth/types";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNotifications } from "@/components/notifications/notifications-context";

export const NotificationsToggle: React.FC = () => {
  const { isSupported, subscription, subscribeToPush, unsubscribeFromPush } =
    useNotifications();

  function onCheckedChange(checked: boolean) {
    if (checked) subscribeToPush();
    else unsubscribeFromPush();
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="notifications"
        checked={!!subscription}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor="notifications">Notificações</Label>
    </div>
  );
};
