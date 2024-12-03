    "use client"

import { useEffect, useState } from "react"
import fetchAllAlbums from "@/app/api-fetch/all-albums"
import { CardProps } from "@/app/model/card-props"
import { processCloudinaryUrl } from "@/app/api-fetch/cloudinary-url-processing"
import VerticalCard from "@/app/components/info-cards/vertical-card"
import Skeleton from "../loading/skeleton"
import ErrorComponent from "./fetch-error"

export default function Albums() {
    const [cards, setCards] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadAlbums() {
            try {
                const albums = await fetchAllAlbums();
                console.log(albums);
                if (!albums) {
                    setError(true);
                    return;
                }
                const cardData: CardProps[] = albums.map((album) => {
                    const url = processCloudinaryUrl(album.thumbnailurl, 200, 200, "collections");
                    return {
                        img: {
                            src: url,
                            alt: album.title,
                            width: 200
                        },
                        title: album.title,
                        subtitle: album.type,
                        href: `/album/${album.id}`
                    };
                });
                setCards(cardData);
                setError(false);
            } catch (e) {
                console.log(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        loadAlbums();
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

    if (error) {
        return <ErrorComponent onReloadClick={() => {
            setError(false);
            setLoading(true);
        }} />;
    }

    if (cards.length === 0) {
        return <div>No albums found</div>;
    }

    return (
        <div className="card-grid grid grid-flow-row">
            {cards.map((card) => (
                <VerticalCard key={card.href} {...card} />
            ))}
        </div>
    );
}