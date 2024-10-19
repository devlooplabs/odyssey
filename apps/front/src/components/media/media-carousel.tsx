import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { H2 } from "@/components/typography/headings";
import { cn } from "@/lib/utils";
import { Media } from "@/lib/odyssey/types";
import React from "react";
import { MediaCard } from "./media-card";

interface MediaCarouselProps {
  medias: Media[];
}

export const MediaCarousel: React.FC<MediaCarouselProps> = ({ medias }) => {
  const arrowCls =
    "hidden md:flex rounded-none border-none hover:bg-transparent hover:text-accent";

  return (
    <div className="w-full space-y-4">
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
          {medias.map((media) => (
            <CarouselItem
              key={media.documentId}
              className="pl-1 basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <MediaCard media={media} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={cn("left-0", arrowCls)} variant="ghost" />
        <CarouselNext className={cn("right-0", arrowCls)} variant="ghost" />
      </Carousel>
    </div>
  );
};