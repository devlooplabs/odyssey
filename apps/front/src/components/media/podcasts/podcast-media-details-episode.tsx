import { PodcastEpisode } from "@/app/actions/podcasts/types";
import { P } from "@/components/typography/texts";
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
