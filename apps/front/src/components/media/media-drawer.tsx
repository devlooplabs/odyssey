import { Media } from "@/lib/odyssey/types";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { MediaDetails } from "./media-details";
import { MediaBanner } from "./media-banner";

interface MediaDialogProps {
  media: Media;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MediaDrawer: React.FC<MediaDialogProps> = ({
  media,
  open,
  onOpenChange,
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="p-0 pt-4">
          <MediaBanner media={media} />
        </DrawerHeader>
        <MediaDetails media={media} />
      </DrawerContent>
    </Drawer>
  );
};
