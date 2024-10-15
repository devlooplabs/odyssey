import React from "react";

interface FeaturesProps {
  features?: string;
}

const FeaturesItem = ({ text }: Readonly<{ text: string }>) => (
  <li className="space-x-2">
    <span className="text-primary">✓</span>
    <span>{text}</span>
  </li>
);

export const Features: React.FC<FeaturesProps> = ({ features }) => {
  const items = features?.split("\n").filter(Boolean) || [];

  return (
    <ul className="space-y-4 text-center">
      {items.map((item, i) => (
        <FeaturesItem key={i} text={item} />
      ))}
    </ul>
  );
};
