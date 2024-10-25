import { MediaContent } from "@/app/actions/types";
import { MediaThumbnail } from "../media-thumbnail";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaContentCardProps {
  content: MediaContent;
  className?: string;
}

export const MediaContentCard: React.FC<MediaContentCardProps> = ({
  content,
  className,
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Link href={content.url}>
        <MediaThumbnail name={content.name} thumbnail={content.thumbnail} />

        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="h-8 w-8" />
        </div>
      </Link>
    </div>
  );
};
