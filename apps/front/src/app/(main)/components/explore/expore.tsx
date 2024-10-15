import { useAuth } from "@/components/auth/auth-context";
import { ExploreMembers } from "./members/explore-members";
import { ExplorePublic } from "./public/explore-public";

export function Explore() {
  const { isMember } = useAuth();
  if (isMember) return <ExploreMembers />;

  return <ExplorePublic />;
}
