// import "material-symbols";
import { Suspense, lazy } from 'react';
import { Metadata } from "next";
import Loading from "./loading";
import Skeleton from "@/app/components/loading/skeleton";

export const metadata: Metadata = {
  title: "MusikStreaming | Home",
  keywords: "music, streaming, material design, songs, artists",
  description: "New music streaming app, using Material Design",
  openGraph: {
    title: "MusikStreaming | Home",
    description: "New music streaming app, using Material Design",
    type: "website"
  }
};

const Artists = lazy(() => import('@/app/components/api-fetch-container/all-artists'));
const Songs = lazy(() => import('@/app/components/api-fetch-container/all-songs'));

/**
 * Home component that renders the main page of the MusikStreaming app.
 * It displays featured artists and songs using Suspense for lazy loading.
 */
export default function Home() {
  return (
    <div className="home w-full flex flex-col gap-8">
      <div className="card-scroll flex flex-col overflow-hidden gap-4">
        <h1 className="text-lg font-bold">Nghệ sĩ nổi bật</h1>
          <Artists />
      </div>
      <div className="card-scroll flex flex-col overflow-x-hidden gap-4">
        <h1 className="text-lg font-bold">Bài hát đang thịnh hành</h1>
          <Songs />
      </div>
    </div>

  );
}
