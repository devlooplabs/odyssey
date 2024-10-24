import { MediaThumbnail } from "@/components/media/media-thumbnail";

export default function Page() {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        <MediaThumbnail variant="book" name="Academia de estudos globais" number={1} />
        <MediaThumbnail variant="book" />
        <MediaThumbnail variant="book" />
      </div>
    </div>
  );
}
