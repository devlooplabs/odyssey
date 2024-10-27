"use client";

import { MediaContent } from "@/app/actions/types";
import { H1, H2 } from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React from "react";

interface MediaContentBlockedBannerProps {
  content: MediaContent;
}

export const MediaContentBlockedBanner: React.FC<
  MediaContentBlockedBannerProps
> = ({ content }) => {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="relative w-full aspect-[6/2] overflow-hidden">
        <div className="absolute inset-0">
          {content.thumbnail && (
            <Image
              src={content.thumbnail.url}
              alt="placeholder"
              objectFit="cover"
              draggable={false}
              sizes="100%"
              fill
            />
          )}
        </div>
        <div className="absolute inset-0 p-6 flex flex-col items-center justify-center gap-8 bg-gradient-to-t from-black/70 to-transparent">
          <div>
            <H2 variant="gradient">Conteúdo exclusivo para assinantes.</H2>
          </div>
          <div>
            <Button
              size="lg"
              className="uppercase rounded-3xl font-semibold"
              onClick={() => router.push("/plans")}
            >
              Assine Agora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
