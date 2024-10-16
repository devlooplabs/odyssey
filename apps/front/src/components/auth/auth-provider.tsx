"use client";

import { useState, useEffect, useTransition } from "react";
import { AuthContext } from "./auth-context";
import { User } from "@/lib/odyssey/types";
import { getAuth, logout } from "@/lib/auth/auth";
import { RoleTypes } from "@/lib/auth/utils";

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [loading, startLoading] = useTransition();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    startLoading(async () => {
      const { user } = await getAuth();
      setUser(user);
    });
  }, []);

  const signOut = async () => {
    startLoading(async () => await logout());
  };

  const isMember = () => {
    return (
      user?.membership?.active === true && user?.role?.type == RoleTypes.member
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isMember: isMember(),
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
