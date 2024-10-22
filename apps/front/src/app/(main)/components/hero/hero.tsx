import { useAuth } from "@/components/auth/auth-context";
import thumbnail from "../../../../../public/images/teste-home.png";
import Image from "next/image";

export function Hero() {
  
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
