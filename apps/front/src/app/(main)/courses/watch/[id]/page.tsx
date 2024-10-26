import { watchCourseLesson } from "@/app/actions/courses";
import { MediaContentDetails } from "@/components/media/content/media-content-details";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { data: lesson } = await watchCourseLesson(params.id);
  if (!lesson) return notFound();

  return (
    <div className="container space-y-8">
      <div className="relative flex justify-center">
        <iframe
          loading="lazy"
          src={lesson.video.provider_metadata.url}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen;"
          className="border border-primary rounded-3xl h-full w-full max-w-[1080px] aspect-video bg-background"
        ></iframe>
      </div>
      <MediaContentDetails content={lesson} />
    </div>
  );
}
