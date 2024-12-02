"use client"

import { useEffect, useState } from "react"
import fetchAllSongs from "@/app/api-fetch/all-songs"
import { CardProps } from "@/app/model/card-props"
import { processCloudinaryUrl } from "@/app/api-fetch/cloudinary-url-processing"
import VerticalCard from "@/app/components/info-cards/vertical-card"
import Skeleton from "../loading/skeleton"
import ErrorComponent from "./fetch-error"
import { randomUUID } from "crypto"
// import ErrorComponent from "./fetch-error"

export default function Songs() {
    const [cards, setCards] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadSongs() {
            try {
                const songs = await fetchAllSongs();
                console.log(songs);
                if (!songs) return;
                const cardData: CardProps[] = songs.map((song) => {
                    const url = processCloudinaryUrl(song.thumbnailurl, 200, 200, "songs");
                    return {
                        img: {
                            src: url,
                            alt: song.title,
                            width: 200
                        },
                        title: song.title,
                        subtitle: song.genre,
                        href: `/song/${song.id}`
                    };
                });
                setCards(cardData);
            } catch (e) {
                console.log(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        loadSongs();
    }, []);

    if (loading) {
        return (
            <div className="card-grid grid grid-flow-row">
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
                <Skeleton className="w-[140px] h-[200px]"/>
            </div>
        );
    }

    if (error || !cards) {
        return <ErrorComponent onReloadClick={() => {
            setError(false);
            setLoading(true);
        }} />;
    }

    return (
        <div className="card-grid grid grid-flow-row">
            {cards.map((card) => (
                card ? <VerticalCard key={card.href} {...card} />
                : <Skeleton key={randomUUID()} className="w-[140px] h-[200px]"/>
            ))}
        </div>
    );
}