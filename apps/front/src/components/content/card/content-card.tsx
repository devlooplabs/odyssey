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
  textVariant,
}) => {
  return (
    <Card className="w-full aspect-video border-none rounded-none relative bg-gradient-to-t from-primary/40 to-background">
      <Link href="/content">
        {thumbnail && (
          <Image
            src={placeholder}
            alt="placeholder"
            style={{
              objectFit: "contain",
            }}
            draggable={false}
            fill
          />
        )}
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
