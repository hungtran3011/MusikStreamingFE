// import "material-symbols";
import { Metadata } from "next";
import HomeContent from "@/app/(main)/content";

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

/**
 * Home component that renders the main page of the MusikStreaming app.
 * It displays featured artists and songs using Suspense for lazy loading.
 */
export default async function Home() {
  return <HomeContent />;
}
