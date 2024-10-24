import { findCourseLessons, findCourseSubmodule } from "@/app/actions/courses";
import { MediaBanner } from "@/components/media/media-banner";
import { MediaThumbnail } from "@/components/media/media-thumbnail";
import { H2 } from "@/components/typography/headings";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{ params: { submoduleId: string } }>) {
  const { data: submodule } = await findCourseSubmodule(params.submoduleId);
  if (!submodule) return notFound();

  const { data: lessons } = await findCourseLessons({
    submoduleId: params.submoduleId,
  });

  return (
    <div className="container space-y-8">
      <div>
        <MediaBanner
          media={submodule}
          className="border border-primary rounded-3xl"
        />
      </div>
      <div className="flex justify-center">
        <H2>Aulas</H2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        {lessons?.map((lesson) => (
          <Link
            key={lesson.documentId}
            href={`/courses/watch/${lesson.documentId}`}
          >
            <MediaThumbnail
              name={lesson.name}
              number={lesson.number}
              thumbnail={lesson.thumbnail}
              className="border border-primary rounded-2xl"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
