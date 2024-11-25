'use client'

import { useEffect, useState } from "react"
import { useCallback } from "react";
import Image from "next/image";
import { Suspense } from "react";
import fetchSongById from "@/app/api-fetch/song-by-id";
import Loading from "../loading";
import ErrorComponent from "@/app/app-components/api-fetch-container/fetch-error";

import type { Song } from "@/app/model/song";
import PlayButton from "@/app/app-components/buttons/play-button-main";
import SongContent from "./content";

export default function SongPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then((params) => setId(params.id));
  }, [params]);

  if (id === null) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <SongContent id={id}/>
    </Suspense>
  )
}