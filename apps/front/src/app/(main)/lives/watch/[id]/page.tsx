import { watchLiveEpisode } from "@/app/actions";
import { getVideoFrameUrl } from "@/lib/bunnycdn";
import { notFound } from "next/navigation";
import { MediaContentDetails } from "@/components/media/content/media-content-details";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const res = await watchLiveEpisode(params.id);
  console.log(res);
  const ep = res.data;
  if (!ep) return notFound();

  const url = ep.video ? await getVideoFrameUrl(ep.video) : null;
  return (
    <div className="container space-y-8">
      <div className="relative flex justify-center">
        {url && (
          <iframe
            loading="lazy"
            src={url}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen;"
            className="border border-primary rounded-3xl h-full w-full max-w-[1080px] aspect-video bg-background"
          ></iframe>
        )}
      </div>
      <MediaContentDetails content={ep} />
    </div>
  );
}
