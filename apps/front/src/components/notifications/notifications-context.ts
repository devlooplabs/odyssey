import { User } from "@/app/actions/auth/types";
import { createContext, useContext } from "react";

interface NotificationsContextProps {
  isSupported: boolean;
  subscription: PushSubscription | null;
  subscribeToPush: () => Promise<void>;
  unsubscribeFromPush: () => Promise<void>;
}

export const NotificationsContext = createContext<NotificationsContextProps | undefined>(
  undefined
);

export const useNotifications = (): NotificationsContextProps => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
