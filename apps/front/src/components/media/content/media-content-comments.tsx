"use client";

import { MediaContent } from "@/app/actions/types";
import { DiscussionEmbed } from "disqus-react";
import { useEffect } from "react";

interface MediaContentComments {
  content: MediaContent;
}

export const MediaContentComments: React.FC<MediaContentComments> = ({
  content,
}) => {
  const SHORT_NAME = "altalinguagemtv";
  const config = {
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${content.url}`,
    identifier: content.documentId,
    title: content.name,
  };

  useEffect(() => {
    if ("DISQUS" in window) {
      (window.DISQUS as any)?.reset({ reload: true, config });
    }
  }, [content.documentId]);

  return (
    <div className="[all:initial]">
      <DiscussionEmbed shortname={SHORT_NAME} config={config} />
    </div>
  );
};
