import Image from "next/image";
import React from "react";
import { MediaContent } from "@/app/actions/types";
import { H1 } from "@/components/typography/headings";
import { P } from "@/components/typography/texts";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface MediaContentBannerProps {
  content: MediaContent;
}

export const MediaContentBanner: React.FC<MediaContentBannerProps> = ({
  content,
}) => {
  const router = useRouter();

  return (
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
      <div className="absolute inset-0 p-6 flex flex-col justify-center gap-8 bg-gradient-to-t from-black/70 to-transparent">
        <div>
          <H1 variant="gradient">{content.name}</H1>
          <div className="max-w-[800px]">
            {content.description && (
              <P
                variant="gradient"
                className="line-clamp-2 md:line-clamp-3 lg:line-clamp-5"
              >
                {content.description}
              </P>
            )}
          </div>
        </div>
        <div>
          <Button
            size="lg"
            className="uppercase rounded-3xl font-semibold"
            onClick={() => router.push(content.url)}
          >
            Assista agora
          </Button>
        </div>
      </div>
    </div>
  );
};
