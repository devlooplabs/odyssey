import { MediaBanner } from "@/components/content/media/media-banner";
import { MediaContentCard } from "@/components/content/media/media-content-card";
import { H2 } from "@/components/typography/headings";
import { getSerieSeason } from "../../actions";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const season = await getSerieSeason(id);
  if (!season) return redirect("/not-found");

  return (
    <div className="space-y-8">
      <div>
        <MediaBanner
          name={`${season.serie!.name}: ${season.name}`}
          description={season.description || season.serie?.description}
          thumbnail={season.thumbnail?.url || season.serie?.thumbnail?.url}
        />
      </div>
      <div className="flex justify-center">
        <H2 variant="gradient">Episódios</H2>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {season.episodes &&
          season.episodes.map((ep) => (
            <MediaContentCard
              key={ep.documentId}
              url={`/series/episodes/${ep.documentId}`}
              name={ep.name}
              publishedAt={ep.publishedAt}
              description={ep.description}
              thumbnail={ep.thumbnail?.formats.medium.url}
            />
          ))}
      </div>
    </div>
  );
}
