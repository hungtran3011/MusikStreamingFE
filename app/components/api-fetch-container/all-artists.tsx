'use client'

import fetchArtists from "@/app/api-fetch/all-artists";
import { CardProps } from "@/app/model/card-props";
import { use, useEffect } from "react";
import { processCloudinaryUrl } from "@/app/api-fetch/cloudinary-url-processing";
import VerticalCard from "../info-cards/vertical-card";
import TextButton from "../buttons/text-button";
import ErrorComponent from "./fetch-error";
import "material-symbols"

export default function Artists() {
  // useEffect to fetch data
  const data = use(fetchArtists());
  useEffect(() => {
    fetchArtists();
  }, [data]);
  
  try {
    console.log(data);
    const cards: CardProps[] = [];
    data!.forEach((artist) => {
      const url = processCloudinaryUrl(artist.avatarurl, 140, 140);
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
      <div className="card-scroll-inner flex gap-4 overflow-x-scroll">
        {cards.map((card, index) => {
          return <VerticalCard key={index} {...card} />;
        })}
      </div>
    );
  }
  catch (e) {
    console.log(e);
    return (
      <ErrorComponent onReloadClick={() => {
        fetchArtists();
      }}/>
    )
  }

  // function createArtistsList() {
    
  // }
}