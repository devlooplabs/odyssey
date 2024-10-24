import {
  findCourse,
  findCourseModule,
  findCourseSubmodules,
} from "@/app/actions/courses";
import { MediaBanner } from "@/components/media/media-banner";
import { MediaThumbnail } from "@/components/media/media-thumbnail";
import { H2 } from "@/components/typography/headings";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{ params: { courseId: string; moduleId: string } }>) {
  const { data: module } = await findCourseModule(params.moduleId);
  if (!module) return notFound();

  const { data: submodules } = await findCourseSubmodules({
    moduleId: params.moduleId,
  });

  return (
    <div className="container space-y-8">
      <div>
        <MediaBanner
          media={module}
          className="border border-primary rounded-3xl"
        />
      </div>
      <div className="flex justify-center">
        <H2>Módulos</H2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        {submodules?.map((submodules) => (
          <Link
            key={submodules.documentId}
            href={`/courses/${params.courseId}/${params.moduleId}/${submodules.documentId}`}
          >
            <MediaThumbnail
              name={submodules.name}
              number={submodules.number}
              thumbnail={submodules.thumbnail}
              className="border border-primary rounded-2xl"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
