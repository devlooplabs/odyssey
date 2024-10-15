import Image from "next/image";
import placeholder from "../../../../../../public/images/image-placeholder.svg";
import Link from "next/link";
import { H2 } from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function HeroMembersFeatured() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center space-y-8">
      <div className="relative aspect-video w-full max-w-[900px] shadow-lg shadow-primary/30 rounded-xl">
        <Link href="/content">
          <Image
            src={placeholder}
            alt="placeholder"
            objectFit="cover"
            draggable={false}
            sizes="100%"
            fill
          />
        </Link>
      </div>
      <div className="flex flex-col items-center space-y-8">
        <div>
          <H2 variant="gradient">
            Ludwig von mises e o Problema do Cálculo Econômico com Daniel Miorim
            e Malboro
          </H2>
        </div>
        <div>
          <Button
            className="rounded-3xl uppercase font-bold text-lg px-8 py-6"
            onClick={() => router.push("/plans")}
          >
            Assistir
          </Button>
        </div>
      </div>
    </div>
  );
}
