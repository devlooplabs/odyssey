import {
  MediaContent,
  MediaContentType,
  MediaVideo,
} from "@/app/actions/types";
import { MediaVideoPlayer } from "./media-video-player";

interface MediaContentPlayerProps {
  content: MediaContent;
}

export const MediaContentPlayer: React.FC<MediaContentPlayerProps> = ({
  content,
}) => {
  switch (content.type) {
    case MediaContentType.video:
      return <MediaVideoPlayer content={content as MediaVideo} />;
    default:
      return null;
  }
};
