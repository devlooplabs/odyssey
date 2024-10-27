import { watchPodcastEpisode } from "@/app/actions/podcasts";
import { MediaContentBlockedBanner } from "@/components/media/content/media-content-blocked-banner";
import { MediaContentDetails } from "@/components/media/content/media-content-details";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { hasAccess, data: episode } = await watchPodcastEpisode(params.id);
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
