import { cn } from "@/lib/utils";
import React from "react";

interface YoutubeProps {
  id: string;
  hideChat?: boolean;
}

export const Youtube: React.FC<YoutubeProps> = ({ id, hideChat = false }) => {
  const baseCls = "border border-2 border-primary shadow-lg shadow-primary/50";

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-center">
      <div className="flex flex-1 justify-center">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          className={cn(
            baseCls,
            "aspect-video w-full h-auto rounded-xl max-w-[920px]"
          )}
        />
      </div>
      {!hideChat && (
        <div className="flex-1 lg:max-w-[30%]">
          <iframe
            src={`https://www.youtube.com/live_chat?v=${id}&embed_domain=localhost`}
            className={cn(
              baseCls,
              "w-full rounded-xl min-h-[400px] md:h-full md:min-h-full"
            )}
          />
        </div>
      )}
    </div>
  );
};
