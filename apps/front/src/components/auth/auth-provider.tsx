"use client";

import { useState, useEffect, useTransition } from "react";
import { AuthContext } from "./auth-context";
import { User } from "@/lib/odyssey/types";
import { getAuth, logout } from "@/lib/auth/auth";
import { RoleTypes } from "@/lib/auth/utils";
import { useRouter, useSearchParams } from "next/navigation";

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, startLoading] = useTransition();
  const [user, setUser] = useState<User | null>(null);

  async function load() {
    const { user } = await getAuth();
    setUser(user);
  }

  function onLogout() {
    startLoading(async () => {
      await logout();
      await load();
    });
  }

  async function onLogin() {
    await load();
    const redirectUrl = searchParams.get("redirectUrl");
    if (redirectUrl) router.push(redirectUrl);
    else router.push("/");
  }

  useEffect(() => {
    startLoading(async () => await load());
  }, []);

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
        logout: onLogout,
        onLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
