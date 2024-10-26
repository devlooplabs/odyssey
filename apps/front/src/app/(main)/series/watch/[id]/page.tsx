import { watchSerieEpisode } from "@/app/actions";
import { MediaContentDetails } from "@/components/media/content/media-content-details";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { data: ep } = await watchSerieEpisode(params.id);
  if (!ep) return notFound();

  return (
    <div className="container space-y-8">
      <div className="relative flex justify-center">
        <iframe
          loading="lazy"
          src={ep.video.provider_metadata.url}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen;"
          className="border border-primary rounded-3xl h-full w-full max-w-[1080px] aspect-video bg-background"
        ></iframe>
      </div>
      <MediaContentDetails content={ep} />
    </div>
  );
}
