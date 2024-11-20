import { Suspense } from "react"
import fetchAllSongs from "@/app/api-fetch/all-songs"
import { CardProps } from "@/app/model/card-props"
import { processCloudinaryUrl } from "@/app/api-fetch/cloudinary-url-processing"
import VerticalCard from "../info-cards/vertical-card"
import ErrorComponent from "./fetch-error"

export default async function Songs(){
    
    try{
        const data = fetchAllSongs();
        console.log(data);
        const cards: CardProps[] = [];
        data.then((songs) => {
            songs!.forEach((song) => {
                const url = processCloudinaryUrl(song.thumbnailurl, 140, 140, "songs");
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
        });
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <div className="card-scroll-inner grid grid-flow-row grid-cols-4">
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
            <h1>Error</h1>
        )
    }
}