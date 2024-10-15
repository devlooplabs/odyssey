"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./auth-context";
import { User } from "@/lib/odyssey/types";
import { getAuth } from "@/lib/odyssey/auth";

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [loading, startLoading] = useTransition();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  function loadUser() {
    startLoading(async () => {
      const { user } = await getAuth();
      setUser(user);
    });
  }

  useEffect(() => {
    loadUser();
  }, []);

  const signIn = () => {
    router.push("/signin");
  };

  const onSignIn = () => {
    loadUser();
  };

  const signOut = async () => {
    startLoading(async () => {
      await fetch("/api/users/signout");
      setUser(null);
      router.push("/signin");
    });
  };

  const isMember = () => {
    return user?.membership?.active === true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isMember: isMember(),
        loading,
        signIn,
        onSignIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
