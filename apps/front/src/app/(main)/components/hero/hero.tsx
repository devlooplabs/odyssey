import { useAuth } from "@/components/auth/auth-context";
import { HeroMembers } from "./members/hero-members";
import { HeroSubscribe } from "./public/hero-public";

export function Hero() {
  const { user, isMember } = useAuth();
  return (
    <div className="flex gap-8 w-full flex-wrap">
      {isMember ? <HeroMembers /> : <HeroSubscribe />}
    </div>
  );
}
