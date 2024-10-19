import { SerieEpisode } from "@/app/actions/series/types";
import { H2 } from "@/components/typography/headings";
import { P } from "@/components/typography/texts";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SerieMediaDetailsEpisodeProps {
  episode: SerieEpisode;
}

export const SerieMediaDetailsEpisode: React.FC<
  SerieMediaDetailsEpisodeProps
> = ({ episode }) => {
  return (
    <div className="flex space-x-4 p-4">
      <div className="self-center">
        <H2>{episode.sequence}</H2>
      </div>
      <div className="relative flex-grow aspect-video max-w-[150px]">
        {episode.thumbnail && (
          <Image
            src={episode.thumbnail.formats.small.url}
            alt="thumbnail"
            fill
          />
        )}
        <Link
          href={`/series/watch/${episode.documentId}`}
          className="absolute inset-0 w-full h-full flex justify-center items-center"
        >
          <PlayCircle className="h-8 w-8" />
        </Link>
      </div>
      <div className="flex-grow">
        <P>{episode.description}</P>
      </div>
    </div>
  );
};
