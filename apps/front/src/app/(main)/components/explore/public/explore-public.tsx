import { H1 } from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ExplorePublic() {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-10 text-center">
      <div>
        <H1 variant="gradient">Programas do Universo Alta Linguagem</H1>
      </div>
      <div>
        <Button
          size="lg"
          className="uppercase font-semibold rounded-3xl"
          onClick={() => router.push("/plans")}
        >
          Confira os planos
        </Button>
      </div>
    </div>
  );
}
