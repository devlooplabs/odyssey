"use client";

import { useState, useEffect, useTransition } from "react";
import { AuthContext } from "./auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { RoleType, User } from "@/app/actions/auth/types";
import { getMe, logout } from "@/app/actions";

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, startLoading] = useTransition();
  const [user, setUser] = useState<User | null>(null);

  async function load() {
    const { user } = await getMe();
    setUser(user);
  }

  function onLogout() {
    startLoading(async () => {
      await logout();
      await load();
    });
  }

  async function onLogin(redirect: boolean = true) {
    await load();
    const redirectUrl = searchParams.get("redirectUrl");
    if (redirect) {
      router.push(redirectUrl || "/");
    }
  }

  useEffect(() => {
    startLoading(async () => await load());
  }, []);

  const isMember = () => {
    return user?.member === true && user?.role?.type == RoleType.member;
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
