"use client";
import { Loader2 } from "lucide-react";
import { useAuth } from "../auth/auth-context";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function UserNav() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  function onSignOut() {
    signOut();
  }

  const buttonCls = "rounded-3xl px-6";

  return (
    <div className="flex gap-4">
      {user ? (
        <Button
          variant="outline"
          onClick={onSignOut}
          className={cn(buttonCls, "uppercase font-normal")}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>Sair</>
          )}
        </Button>
      ) : (
        <>
          <Button
            variant="outline"
            onClick={() => router.push("/signin")}
            className={cn(buttonCls, "uppercase")}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin font-normal" />
            ) : (
              <>Login</>
            )}
          </Button>
          <Button className="rounded-3xl px-6 font-semibold">Faça Parte</Button>
        </>
      )}
    </div>
  );
}
