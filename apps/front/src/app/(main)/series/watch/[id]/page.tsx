import { findSerieEpisode } from "@/app/actions";
import { H1 } from "@/components/typography/headings";
import { P } from "@/components/typography/texts";
import { getVideoFrameUrl } from "@/lib/bunnycdn";
import { notFound } from "next/navigation";

export default async function Page({ params }: Readonly<{ params: { id: string } }>) {
  const { data: ep } = await findSerieEpisode(params.id);
  if (!ep) return notFound();

  const url = ep.video ? await getVideoFrameUrl(ep.video) : null;
  return (
    <div className="space-y-8">
      <div className="relative flex justify-center">
        {url && (
          <iframe
            loading="lazy"
            src={url}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen;"
            className="border border-primary rounded-3xl h-full w-full max-w-[1080px] aspect-video bg-background"
          />
        )}
      </div>
      <div>
        <div>
          <H1 variant="gradient">{ep.name}</H1>
        </div>
        <div>
          <P variant="gradient">{ep.description}</P>
        </div>
      </div>
    </div>
  );
}
