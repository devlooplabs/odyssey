import { findCurrentLive } from "@/app/actions";
import { LivePlayer } from "./components/live-player";
import { LiveEpisodes } from "./components/live-episodes";

export default async function Page() {
  const res = await findCurrentLive();

  return (
    <div className="container space-y-8 divide-y">
      {res.data && <LivePlayer live={res.data} />}
      <LiveEpisodes />
    </div>
  );
}
