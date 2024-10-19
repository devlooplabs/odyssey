import { MediaVideo } from "@/app/actions/types";

interface MediaVideoPlayerProps {
  content: MediaVideo;
}

export const MediaVideoPlayer: React.FC<MediaVideoPlayerProps> = ({
  content,
}) => {
  return <div>video player</div>;
};
