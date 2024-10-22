import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { H2, H3 } from "@/components/typography/headings";
import { cn } from "@/lib/utils";
import React from "react";
import { MediaContent } from "@/app/actions/types";
import { MediaContentCard } from "./media-content-card";

interface MediaContentCarouselProps {
  title?: string;
  content: MediaContent[];
}

export const MediaContentCarousel: React.FC<MediaContentCarouselProps> = ({
  title,
  content,
}) => {
  const arrowCls =
    "hidden md:flex rounded-none border-none hover:bg-transparent hover:text-accent";

  return (
    <div className="w-full space-y-4">
      {title && (
        <div className="mx-10">
          <H3 variant="gradient">{title}</H3>
        </div>
      )}
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
          {content.map((entry) => (
            <CarouselItem
              key={entry.documentId}
              className="pl-1 basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <MediaContentCard content={entry} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={cn("left-0", arrowCls)} variant="ghost" />
        <CarouselNext className={cn("right-0", arrowCls)} variant="ghost" />
      </Carousel>
    </div>
  );
};
