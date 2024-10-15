import { ContentCard } from "./content-card";

export function ContentCardGroup() {
  return (
    <div className="w-full flex gap-8 justify-center flex-wrap">
      <ContentCard name="Teste" />
      <ContentCard name="Teste" />
      <ContentCard name="Teste" />
      <ContentCard name="Teste" />
      <ContentCard name="Teste" />
    </div>
  );
}
