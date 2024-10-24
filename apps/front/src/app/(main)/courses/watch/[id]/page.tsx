import { watchCourseLesson } from "@/app/actions/courses";
import { H1 } from "@/components/typography/headings";
import { P } from "@/components/typography/texts";
import { getVideoFrameUrl } from "@/lib/bunnycdn";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { data: lesson } = await watchCourseLesson(params.id);
  if (!lesson) return notFound();

  const url = lesson.video ? await getVideoFrameUrl(lesson.video) : null;
  return (
    <div className="container space-y-8">
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
          <H1 variant="gradient">{lesson.name}</H1>
        </div>
        <div>
          <P variant="gradient">{lesson.description}</P>
        </div>
      </div>
    </div>
  );
}
