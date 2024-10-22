import React, { useState } from "react";
import { MediaThumbnail } from "./media-thumbnail";
import { MediaDialog } from "./media-dialog";
import { MediaDrawer } from "./media-drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Media } from "@/app/actions/types";

interface MediaCardProps {
  media: Media;
  variant?: "default" | "square";
}

export const MediaCard: React.FC<MediaCardProps> = ({ media, variant }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <div className="w-full" role="button" onClick={() => setOpen(true)}>
        <MediaThumbnail
          variant={variant}
          name={media.name}
          thumbnail={media.thumbnail}
        />
      </div>
      {isDesktop ? (
        <MediaDialog media={media} open={open} onOpenChange={setOpen} />
      ) : (
        <MediaDrawer media={media} open={open} onOpenChange={setOpen} />
      )}
    </>
  );
};
