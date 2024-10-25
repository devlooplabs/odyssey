import { MediaContent } from "@/app/actions/types";
import { H1 } from "@/components/typography/headings";
import { P } from "@/components/typography/texts";
import { MediaContentComments } from "./media-content-comments";

interface MediaContentDetailsProps {
  content: MediaContent;
}

export const MediaContentDetails: React.FC<MediaContentDetailsProps> = ({
  content,
}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <H1 variant="gradient">{content.name}</H1>
        </div>
        <div>
          <P variant="gradient">{content.description}</P>
        </div>
      </div>
      <div>
        <MediaContentComments content={content} />
      </div>
    </div>
  );
};
