import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import placeholder from "../../../../public/images/image-placeholder.svg";
import Link from "next/link";
import Image from "next/image";

interface MediaCardProps {
  name: string;
  url: string;
  thumbnail?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  name,
  url,
  thumbnail,
}) => {
  return (
    <div className="flex flex-col">
      <Card className="w-[300px] h-[400px] border-primary rounded-3xl overflow-hidden relative">
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
      </Card>
      <div className="space-x-4 text-center">
        <span className="text-5xl font-bold">1</span>
        <span className="text-3xl font-semibold">{name}</span>
      </div>
    </div>
  );
};
