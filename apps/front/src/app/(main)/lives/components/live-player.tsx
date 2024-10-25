import { Live } from "@/app/actions/lives/types";
import { H2, H3 } from "@/components/typography/headings";
import { P } from "@/components/typography/texts";
import { extractYouTubeVideoID } from "@/lib/youtube";
import React from "react";

interface LiveProps {
  live: Live;
}

export const LivePlayer: React.FC<LiveProps> = ({ live }) => {
  const id = extractYouTubeVideoID(live.youtubeUrl);
  return (
    <div className="space-y-4 divide-y">
      <div className="flex flex-wrap md:flex-nowrap gap-4 pt-6">
        <div className="w-full relative">
          <div className="flex justify-center absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-500"></span>
              <span className="font-bold">Live</span>
            </div>
          </div>
          <iframe
            className="w-full aspect-video border border-primary rounded-2xl"
            src={`https://www.youtube.com/embed/${id}`}
            title={live.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          ></iframe>
        </div>
        <iframe
          className="w-full md:max-w-[400px] border border-primary rounded-2xl"
          src={`https://www.youtube.com/live_chat?v=${id}&embed_domain=localhost`}
        ></iframe>
      </div>
      <div className="pt-4">
        <H2>{live.name}</H2>
        {live.description && <P>{live.description}</P>}
      </div>
    </div>
  );
};
