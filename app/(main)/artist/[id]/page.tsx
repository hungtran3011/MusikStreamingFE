/**
 * @fileoverview Artist page
 * @filedescription This file contains the ArtistPage component which fetches and displays artist data based on the provided artist ID.
 * 
 */
"use client";
import type { Artist } from '@/app/model/artist';
import { useState, useEffect, use } from 'react';
import fetchArtistById from '@/app/api-fetch/artist-by-id';
import Image from 'next/image';
import { Suspense } from 'react';
import Loading from '@/app/components/loading/loading';
import ErrorComponent from '@/app/components/api-fetch-container/fetch-error';

/**
 * ArtistPage component fetches and displays artist data.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The artist ID.
 * @returns {JSX.Element} The rendered component.
 */
export default function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
    const [artist, setArtist] = useState<Artist>();
    const [error, setError] = useState<string | null>(null);
    const data = use(fetchData());

    useEffect(() => {
        fetchData();
    });

    async function fetchData() {
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
    }



    try {
        return (
            <Suspense fallback={<Loading/>}>
                <div className='flex w-full'>
                    {
                        artist ? (
                            <div className='flex flex-col items-center w-full'>
                                <Image src={artist.avatarurl} alt={artist.name} width={200} height={200} />
                                <h1>{artist.name}</h1>
                                <p>{artist.description}</p>
                            </div>
                        ) : null
                    }
                </div>
            </Suspense>
        );
    } catch (e) {
        console.error(e);
        return <ErrorComponent onReloadClick={fetchData} />;
    }
}