import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import placeholder from "../../../../public/images/image-placeholder.svg";
import Link from "next/link";
import Image from "next/image";
import { P } from "@/components/typography/texts";

interface MediaContentCardProps {
  name: string;
  url: string;
  publishedAt?: string;
  thumbnail?: string;
  description?: string;
}

export const MediaContentCard: React.FC<MediaContentCardProps> = ({
  name,
  url,
  publishedAt,
  thumbnail,
  description,
}) => {
  return (
    <Card className="border-none rounded-none bg-background max-w-[400px]">
      <CardContent className="p-0">
        <div className="w-[400px] aspect-video border rounded-3xl border-primary rounded-3xl overflow-hidden relative">
          <Link href={url}>
            <Image
              src={thumbnail || placeholder}
              alt="placeholder"
              objectFit="cover"
              draggable={false}
              sizes="100%"
              fill
            />
          </Link>
        </div>
      </CardContent>
      <CardFooter className="px-2 mt-2">
        <div className="space-y-1 overflow-hidden">
          {publishedAt && (
            <P size="sm" className="text-muted-foreground">
              {publishedAt}
            </P>
          )}
          <P className="truncate font-bold">{name}</P>
          <P size="sm" className="truncate text-muted-foreground">
            {description}
          </P>
        </div>
      </CardFooter>
    </Card>
  );
};
