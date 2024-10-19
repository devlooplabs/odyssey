import { Media } from "@/lib/odyssey/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { MediaDetails } from "./media-details";
import Image from "next/image";
import { MediaBanner } from "./media-banner";

interface MediaDialogProps {
  media: Media;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MediaDialog: React.FC<MediaDialogProps> = ({
  media,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-100px)] lg:max-w-[850px] p-0 rounded-xl">
        <DialogHeader>
          <MediaBanner media={media} />
        </DialogHeader>
        <MediaDetails media={media} />
      </DialogContent>
    </Dialog>
  );
};