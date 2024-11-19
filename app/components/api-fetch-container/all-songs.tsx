// 'use client';

import { Suspense } from "react"
import fetchAllSongs from "@/app/api-fetch/all-songs"
import { CardProps } from "@/app/model/card-props"
import { processCloudinaryUrl } from "@/app/api-fetch/cloudinary-url-processing"
import VerticalCard from "../info-cards/vertical-card"

export default async function Songs() {
    // const data = use(fetchAllSongs());
    // useEffect(() => {
    //     fetchAllSongs();
    // }, [data]);
    try{
        const data = await fetchAllSongs();
        console.log(data);
        const cards: CardProps[] = [];
        data!.forEach((song) => {
            const url = processCloudinaryUrl(song.thumnailurl, 140, 140);
            cards.push({
                img: {
                    src: url,
                    alt: song.title,
                    width: 140
                },
                title: song.title,
                subtitle: song.genre,
                href: `/song/${song.id}`
            });
        });
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <div className="card-scroll-inner flex gap-4 overflow-x-scroll">
                    {
                        cards.map((card, index) => {
                            return <VerticalCard key={index} {...card} />;
                        })
                    }
                </div>
            </Suspense>
        ) 
    }
    catch(e) {
        console.log(e);
        return (
            <div>Error</div>
        )
    }
}