// import "material-symbols";
import { Suspense } from 'react';
import { Metadata } from "next";
import Artists from "../components/api-fetch-container/all-artists";
import Loading from "../components/loading/loading";
import Songs from "../components/api-fetch-container/all-songs";

export const metadata: Metadata = {
  title: "MusikStreaming | Home",
  description: "New music streaming app, using Material Design",
};

/**
 * Home component that renders the main page of the MusikStreaming app.
 * It displays featured artists and songs using Suspense for lazy loading.
 */
export default function Home() {
  return (
    <div className="home w-full">
      <div className="card-scroll flex flex-col overflow-x-hidden gap-4">
        <h1 className="text-lg font-bold">Nghệ sĩ nổi bật</h1>
        <Suspense fallback={<Loading/>}>
          <Artists/>
        </Suspense>
      </div>
      
      
      <div className="card-scroll flex flex-col overflow-x-hidden gap-4">
        <h1 className="text-lg font-bold">Nghệ sĩ nổi bật</h1>
        <Suspense fallback={<Loading/>}>
          <Songs/>
        </Suspense>
      </div>
    </div>
  );
}
