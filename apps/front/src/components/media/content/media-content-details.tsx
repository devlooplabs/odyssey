import { MediaContent } from "@/app/actions/types";
import { H1 } from "@/components/typography/headings";
import { P } from "@/components/typography/texts";
import { MediaContentComments } from "./media-content-comments";

interface MediaContentDetailsProps {
  hasAccess: boolean;
  content: MediaContent;
}

export const MediaContentDetails: React.FC<MediaContentDetailsProps> = ({
  hasAccess,
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
      <div>{hasAccess && <MediaContentComments content={content} />}</div>
    </div>
  );
};
