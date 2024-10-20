import { useAuth } from "@/components/auth/auth-context";
import { HeroMembers } from "./members/hero-members";
import { HeroSubscribe } from "./public/hero-public";
import thumbnail from "../../../../../public/images/teste-home.png";
import Image from "next/image";

export function Hero() {
  const { user, isMember } = useAuth();
  return (
    <div className="flex gap-8 w-full h-full m-h-[500px] relative">
      <Image
        src={thumbnail}
        alt="thumbnail"
        style={{
          objectFit: "cover",
        }}
        fill
      />
    </div>
  );
}
