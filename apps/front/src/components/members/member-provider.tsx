"use client";

import { useEffect } from "react";
import { MemberContext } from "./member-context";
import { useAuth } from "../auth/auth-context";
import { useRouter } from "next/navigation";

export function MemberProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role.type !== "member") {
      router.push("/plans");
    }
  }, [router, user]);

  return (
    <MemberContext.Provider
      value={{}}
    >
      <>
        {children}
      </>
    </MemberContext.Provider>
  );
}
