'use client'

import { useState, useEffect } from "react";

import VerticalCard from "../info-cards/vertical-card";
import ErrorComponent from "./fetch-error";

import { CardProps } from "@/app/model/card-props";

import fetchArtists from "@/app/api-fetch/all-artists";
import { processCloudinaryUrl } from "@/app/api-fetch/cloudinary-url-processing";

// import "material-symbols/outlined.css"
import { Artist } from "@/app/model/artist";

export default function Artists() {
  // useEffect to fetch data
  const [data, setData] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const loadArtists = async () => {
    try{
      setIsLoading(true);
      const artists = await fetchArtists();
      setData(artists!);
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
  
  try {
    console.log(data);
    const cards: CardProps[] = [];
    if (!data) return null;
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
      <div className="card-scroll-inner flex gap-4 overflow-x-scroll flex-wrap">
        {cards.map((card, index) => {
          return <VerticalCard key={index} {...card} />;
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
      }}/>
    )
  }

  // function createArtistsList() {
    
  // }
}