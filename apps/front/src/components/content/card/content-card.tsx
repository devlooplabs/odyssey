import placeholder from "../../../../public/images/image-placeholder.svg";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { P } from "@/components/typography/texts";
import React from "react";

interface ContentCardProps {
  name: string;
  thumbnail?: string;
  textVariant?: "default" | "gradient";
}

export const ContentCard: React.FC<ContentCardProps> = ({
  name,
  thumbnail,
  textVariant
}) => {
  return (
    <Card className="w-[210px] h-[315px] border-none rounded-none overflow-hidden relative">
      <Link href="/content">
        <Image
          src={thumbnail || placeholder}
          alt="placeholder"
          objectFit="cover"
          draggable={false}
          sizes="100%"
          fill
        />
        <P
          size="lg"
          variant={textVariant}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 uppercase"
        >
          {name}
        </P>
      </Link>
    </Card>
  );
};
