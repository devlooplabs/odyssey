import { PodcastEpisode } from "@/app/actions/podcasts/types";
import { SerieEpisode } from "@/app/actions/series/types";
import { H2 } from "@/components/typography/headings";
import { P } from "@/components/typography/texts";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MediaContentCard } from "../content/media-content-card";

interface PodcastMediaDetailsEpisodeProps {
  episode: PodcastEpisode;
}

export const PodcastMediaDetailsEpisode: React.FC<
  PodcastMediaDetailsEpisodeProps
> = ({ episode }) => {
  return (
    <div className="flex space-x-4 p-4">
      <div className="relative flex-grow aspect-video min-w-[150px]">
        <MediaContentCard content={episode} />
      </div>
      <div className="flex items-center">
        <P>{episode.description}</P>
      </div>
    </div>
  );
};
