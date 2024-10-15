"use client";

import Image from "next/image";
import hero from "./images/hero.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { P } from "@/components/typography/texts";

export function HeroSubscribe() {
  const router = useRouter();

  return (
    <div className="flex items-center">
      <Image src={hero} alt="hero image" width={900} draggable={false} />
      <div className="max-w-[700px] flex flex-col gap-8">
        <div>
          <P variant="gradient" size="xl">
            A maior plataforma de conteúdo intelectual do Brasil.
          </P>
          <P variant="gradient" size="xl">
            Una entretenimento com estudos em um só lugar.
          </P>
        </div>
        <div>
          <Button
            className="rounded-3xl uppercase font-bold text-lg px-8 py-6"
            onClick={() => router.push("/plans")}
          >
            Assine Agora
          </Button>
        </div>
      </div>
    </div>
  );
}
