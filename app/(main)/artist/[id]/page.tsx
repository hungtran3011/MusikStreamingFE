/**
 * @author @hungtran3011
 * @fileoverview Artist page
 * @filedescription This file contains the ArtistPage component which fetches and displays artist data based on the provided artist ID.
 * @module ArtistPage
 * @requires @/app/model/artist
 * @requires react
 * @requires @/app/api-fetch/artist-by-id
 */
"use client";
import type { Artist } from '@/app/model/artist';
import { useState, useEffect, useCallback } from 'react';
import fetchArtistById from '@/app/api-fetch/artist-by-id';
import Image from 'next/image';
import { Suspense } from 'react';
import ErrorComponent from '@/app/app-components/api-fetch-container/fetch-error';
import Skeleton from '@/app/app-components/loading/skeleton';

/**
 * ArtistPage component fetches and displays artist data.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The artist ID.
 * @returns {JSX.Element} The rendered component.
 * @throws {Error} Any error thrown by the fetchArtistById function.
 */
export default function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
    const [artist, setArtist] = useState<Artist | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const data = await params;
            const artist = await fetchArtistById(data.id);
            if (!artist) return;
            setArtist(artist);
        } catch (e) {
            console.error(e);
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError(String(e));
            }
        }
    }, [params]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // const data = use(fetchData());

    try {
        return (
            // <Suspense fallback={<Loading/>}>
            <div className='flex w-full'>
                <div className='flex flex-col items-center w-full'>
                    <Suspense fallback={<Skeleton className="w-[200px] h-[200px]"/>}>
                    {
                        artist ?
                        <Image
                        src={artist.avatarurl}
                        alt={artist.name}
                        width={200}
                        height={200}
                        />
                        : <Skeleton className="w-[200px] h-[200px]"/>
                    }
                        
                    </Suspense>
                    <Suspense fallback={<Skeleton className="w-[200px] h-6"/>}/>
                    {
                        artist ? <h1>{artist.name}</h1> : <Skeleton className="w-[200px] h-6"/>
                    }
                    <Suspense fallback={<Skeleton className="w-[200px] h-6"/>}/>
                    {
                        artist ? <p>{artist.description}</p> : <Skeleton className="w-[200px] h-6"/>
                    }
                </div>

            </div>
        );
    } catch (e) {
        console.error(e);
        return <ErrorComponent onReloadClick={fetchData} />;
    }

    if (error) {
        return <ErrorComponent onReloadClick={fetchData} />;
    }
}