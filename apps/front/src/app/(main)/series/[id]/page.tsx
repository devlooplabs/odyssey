import { MediaBanner } from "@/components/content/media/media-banner";
import { MediaCard } from "@/components/content/media/media-card";
import { H2 } from "@/components/typography/headings";
import { getSerie } from "../actions";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const serie = await getSerie(id);
  if (!serie) return redirect("/not-found");

  return (
    <div className="space-y-8">
      <div>
        <MediaBanner
          name={serie.name}
          description={serie.description}
          thumbnail={serie.thumbnail?.url}
        />
      </div>
      <div className="flex justify-center">
        <H2 variant="gradient">Temporadas</H2>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {serie.seasons &&
          serie.seasons.map((season) => (
            <MediaCard
              key={season.documentId}
              url={`/series/seasons/${season.documentId}`}
              name={season.name}
              thumbnail={season.thumbnail?.formats.medium.url}
            />
          ))}
      </div>
    </div>
  );
}
