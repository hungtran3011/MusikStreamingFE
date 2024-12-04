// import "material-symbols";
"use client";
import { Suspense } from "react";
// import Content from "./content";
import dynamic from "next/dynamic";
import Loading from "./loading";

const Content = dynamic(() => import('./content'), { ssr: false });
/**
 * Home component that renders the main page of the MusikStreaming app.
 * It displays featured artists and songs using Suspense for lazy loading.
 */
export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Content />
    </Suspense>
  ); 
}
