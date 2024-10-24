import { findCourses } from "@/app/actions/courses";
import { MediaThumbnail } from "@/components/media/media-thumbnail";
import { H1 } from "@/components/typography/headings";
import Link from "next/link";

export default async function Page() {
  const { data: courses } = await findCourses({});

  return (
    <div className="container space-y-8">
      <div className="flex justify-center">
        <H1 variant="gradient">Cursos e Formações</H1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        {courses?.map((course) => (
          <Link key={course.documentId} href={`/courses/${course.documentId}`}>
            <MediaThumbnail
              variant="book"
              name={course.name}
              number={course.number}
              thumbnail={course.thumbnail}
              className="border border-primary rounded-3xl"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
