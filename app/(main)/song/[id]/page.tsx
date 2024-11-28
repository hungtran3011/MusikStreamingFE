'use client'

import { useEffect, useState, lazy } from "react"
import { Suspense } from "react";
import Loading from "../loading";

const SongContent = lazy(() => import('./content'));

export default function SongPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then((params) => setId(params.id));
  }, [params]);

  if (id === null) {
    return <Loading />;
  }

  return (
    // <Suspense fallback={<Loading />}>
    <SongContent id={id}/>
  )
}