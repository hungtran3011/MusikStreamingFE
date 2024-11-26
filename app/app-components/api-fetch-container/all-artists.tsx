'use client'

import { useState, useEffect, Suspense } from "react";

import VerticalCard from "../info-cards/vertical-card";
import ErrorComponent from "./fetch-error";

import { CardProps } from "@/app/model/card-props";

import fetchArtists from "@/app/api-fetch/all-artists";
import { processCloudinaryUrl } from "@/app/api-fetch/cloudinary-url-processing";
import Loading from "@/app/app-components/loading/loading";

import { Artist } from "@/app/model/artist";
import Skeleton from "../loading/skeleton";

export default function Artists() {
  // useEffect to fetch data
  const [data, setData] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const loadArtists = async () => {
    try {
      setIsLoading(true);
      const artists = await fetchArtists();
      if (artists) {
        setData(artists);
      } else {
        throw new Error('No artists data received');
      }
    }
    catch (e) {
      console.error('Error fetching artists:', e);
      setError(e);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArtists();
  }, []);

  if (isLoading) {
    <div className="card-scroll-inner flex gap-4 flex-wrap">
      <Skeleton className="w-[140px] h-[200px]"/>
      <Skeleton className="w-[140px] h-[200px]"/>
      <Skeleton className="w-[140px] h-[200px]"/>
      <Skeleton className="w-[140px] h-[200px]"/>
    </div>
  }

  try {
    console.log(data);
    const cards: CardProps[] = [];
    if (!data) {
      return (
        <ErrorComponent onReloadClick={() => {
          // fetchArtists();
          setError(null);
          setIsLoading(true);
          loadArtists();
        }} />
      );
    }
    data.forEach((artist) => {
      const url = processCloudinaryUrl(artist.avatarurl, 140, 140, "artists");
      console.log(url);
      cards.push({
        img: {
          src: url,
          alt: artist.name,
          width: 140,
        },
        title: artist.name,
        subtitle: "",
        href: `/artist/${artist.id}`
      });
    });
    return (
      <div className="card-scroll-inner flex gap-4 flex-wrap">
        {cards.map((card, index) => {
          return (
          // <Suspense key={index} fallback={<Skeleton className="w-[140px] h-[200px]"/>}>
            <VerticalCard key={index} {...card} />
          // </Suspense>
          );
        })}
      </div>
    );
  }
  catch (e) {
    console.error('Error fetching artists:', e);
    return (
      <ErrorComponent onReloadClick={() => {
        // fetchArtists();
        setError(null);
        setIsLoading(true);
        loadArtists();
      }} />
    )
  }
}