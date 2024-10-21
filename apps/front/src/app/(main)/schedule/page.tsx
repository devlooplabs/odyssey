import { findPodcasts } from "@/app/actions/podcasts";
import { WeekDays, WeekDaysText } from "@/app/actions/podcasts/types";
import { MediaThumbnail } from "@/components/media/media-thumbnail";
import { H1, H2, H3, H4 } from "@/components/typography/headings";

export default async function Page() {
  const { data: podcasts } = await findPodcasts();

  return (
    <div className="container">
      <div className="space-y-8">
        <div className="flex justify-center">
          <H1 variant="gradient">Programação</H1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {Object.keys(WeekDays).map((key) => (
            <div key={key} className="flex flex-col gap-2">
              <div className="h-12 text-xl flex justify-center items-center text-primary font-semibold">
                {WeekDaysText[key as WeekDays]}
              </div>
              <div className="flex flex-col gap-2">
                {podcasts?.length &&
                  podcasts
                    .filter((podcast) => podcast.dayOfWeek === key)
                    .map((podcast) => (
                      <div key={podcast.documentId}>
                        <MediaThumbnail
                          variant="square"
                          thumbnail={podcast.thumbnail}
                        />
                      </div>
                    ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-center">
            <H2>Últimos episódios</H2>
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            <H2>Podcasts</H2>
          </div>
        </div>
      </div>
    </div>
  );
}
