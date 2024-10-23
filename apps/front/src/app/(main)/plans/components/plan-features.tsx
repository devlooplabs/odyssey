import React from "react";

interface PlanFeaturesProps {
  features?: string;
}

const PlanFeaturesItem = ({ text }: Readonly<{ text: string }>) => (
  <li className="space-x-2">
    <span className="text-primary">✓</span>
    <span>{text}</span>
  </li>
);

export const PlanFeatures: React.FC<PlanFeaturesProps> = ({ features }) => {
  const items = features?.split("\n").filter(Boolean) || [];

  return (
    <ul className="space-y-4 text-center">
      {items.map((item, i) => (
        <PlanFeaturesItem key={i} text={item} />
      ))}
    </ul>
  );
};
