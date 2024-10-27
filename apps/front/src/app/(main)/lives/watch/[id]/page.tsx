import { watchLiveEpisode } from "@/app/actions";
import { notFound } from "next/navigation";
import { MediaContentDetails } from "@/components/media/content/media-content-details";
import { MediaContentBlockedBanner } from "@/components/media/content/media-content-blocked-banner";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { hasAccess, data: episode } = await watchLiveEpisode(params.id);
  if (!episode) return notFound();

  return (
    <div className="container space-y-8">
      <div className="relative flex justify-center">
        {hasAccess ? (
          <iframe
            loading="lazy"
            src={episode.video.provider_metadata.url}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen;"
            className="border border-primary rounded-3xl h-full w-full max-w-[1080px] aspect-video bg-background"
          ></iframe>
        ) : (
          <MediaContentBlockedBanner content={episode} />
        )}
      </div>
      <MediaContentDetails hasAccess={hasAccess} content={episode} />
    </div>
  );
}
