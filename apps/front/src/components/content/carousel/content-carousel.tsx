import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ContentCard } from "../card/content-card";
import { H2 } from "@/components/typography/headings";

export function ContentCarousel() {
  const range = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <H2 variant="gradient">Séries</H2>
      </div>
      <Carousel
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {range.map((value) => (
            <CarouselItem key={value} className="basis-60 flex justify-center">
              <ContentCard name={value.toString()} textVariant="gradient" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
