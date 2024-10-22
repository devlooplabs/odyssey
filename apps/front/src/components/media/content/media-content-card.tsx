import { MediaContent } from "@/app/actions/types";
import { MediaThumbnail } from "../media-thumbnail";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

interface MediaContentCardProps {
  content: MediaContent;
}

export const MediaContentCard: React.FC<MediaContentCardProps> = ({ content }) => {
  return (
    <div>
      <Link href={content.url} className="relative">
        <MediaThumbnail name={content.name} thumbnail={content.thumbnail} />

        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="h-8 w-8" />
        </div>
      </Link>
    </div>
  );
}