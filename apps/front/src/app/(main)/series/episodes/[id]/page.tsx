import { H1 } from "@/components/typography/headings";
import { P } from "@/components/typography/texts";
import { getEpisode, getVideoIFrameUrl } from "../../actions";
import { redirect } from "next/navigation";
import { MediaBanner } from "@/components/content/media/media-banner";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const ep = await getEpisode(id);
  if (!ep) return redirect("/not-found");

  let url = ep.video
    ? await getVideoIFrameUrl(ep.video.provider_metadata.guid)
    : null;

  return (
    <div className="space-y-8">
      <div className="relative flex justify-center">
        {url ? (
          <iframe
            loading="lazy"
            src={url}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen;"
            className="border border-primary rounded-3xl w-full max-w-[1080px] aspect-video"
          />
        ) : (
          <MediaBanner
            name="Conteúdo bloqueado"
            thumbnail={
              ep.thumbnail
                ? `${process.env.NEXT_PUBLIC_ODYSSEY_STRAPI_BASE_URL}${ep.thumbnail?.url}`
                : undefined
            }
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
