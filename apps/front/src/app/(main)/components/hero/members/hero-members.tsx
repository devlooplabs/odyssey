import { HeroMembersFeatured } from "./hero-members-featured";
import { HeroMembersLive } from "./hero-members-live";

export function HeroMembers() {
  const isLive = false;
  return isLive ? <HeroMembersLive /> : <HeroMembersFeatured />;
}
