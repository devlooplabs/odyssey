import { findCourse, findCourseModules } from "@/app/actions/courses";
import { MediaThumbnail } from "@/components/media/media-thumbnail";
import { H1 } from "@/components/typography/headings";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{ params: { courseId: string } }>) {
  const { data: course } = await findCourse(params.courseId);
  if (!course) return notFound();

  const { data: modules } = await findCourseModules({
    courseId: params.courseId,
  });

  return (
    <div className="container space-y-8">
      <div className="flex justify-center">
        <H1 variant="gradient">{course.name}</H1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
        {modules?.map((module) => (
          <Link
            key={module.documentId}
            href={`/courses/${params.courseId}/${module.documentId}`}
          >
            <MediaThumbnail
              variant="book"
              name={module.name}
              number={module.number}
              thumbnail={module.thumbnail}
              className="border border-t-8 border-primary rounded-2xl"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
