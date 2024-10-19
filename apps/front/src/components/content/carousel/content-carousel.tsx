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
import { cn } from "@/lib/utils";

export function ContentCarousel() {
  const range = Array.from({ length: 10 }, (_, i) => i + 1);
  const arrowCls =
    "hidden md:flex rounded-none border-none hover:bg-transparent hover:text-accent";

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <H2 variant="gradient">Séries</H2>
      </div>
      <Carousel
        opts={{
          loop: true,
          slidesToScroll: 3, // Default for mobile devices
          breakpoints: {
            "(min-width: 768px)": { slidesToScroll: 4 }, // Tablets
            "(min-width: 1024px)": { slidesToScroll: 5 }, // Desktops
            "(min-width: 1280px)": { slidesToScroll: 6 }, // Desktops
          },
        }}
      >
        <CarouselContent>
          {range.map((value) => (
            <CarouselItem
              key={value}
              className="pl-1 basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <ContentCard name={value.toString()} textVariant="gradient" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={cn("left-0", arrowCls)} variant="ghost" />
        <CarouselNext className={cn("right-0", arrowCls)} variant="ghost" />
      </Carousel>
    </div>
  );
}
