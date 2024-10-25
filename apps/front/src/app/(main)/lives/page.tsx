import { findLiveEpisodes } from "@/app/actions";
import { MediaThumbnail } from "@/components/media/media-thumbnail";
import { H2 } from "@/components/typography/headings";
import Link from "next/link";

export default async function Page() {
  const { data: lives } = await findLiveEpisodes({});

  return (
    <div className="container space-y-8">
      <div className="flex justify-center">
        <H2 variant="gradient">Lives Anteriores</H2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        {lives?.map((live) => (
          <Link key={live.documentId} href={`/lives/watch/${live.documentId}`}>
            <MediaThumbnail
              name={live.name}
              thumbnail={live.thumbnail}
              className="border border-primary rounded-2xl"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
