/**
 * @fileoverview Artist page
 * @filedescription This file contains the ArtistPage component which fetches and displays artist data based on the provided artist ID.
 * 
 */
"use client";
import type { Artist } from '@/app/model/artist';
import { useState, useEffect } from 'react';
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
export default function ArtistPage({ params }: { params: { id: string } }) {
    // fetch artist data
    const [artists, setArtists] = useState<Artist[]>([]);
    const [error, setError] = useState<string | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // setLoading(true);
        fetchArtistById(params.id)
            .then(setArtists)
            .catch((err) => setError(err.message))
            // .finally(() => setLoading(false));
    }, [params.id]);

    // if (loading) {
    //     return <Loading />;
    // }

    if (error) {
        return <ErrorComponent onReloadClick={() => { fetchArtistById(params.id).then(setArtists).catch((err) => setError(err.message)); }} />;
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className='flex w-full'>
                {
                    artists.map((artist) => (
                        <div key={artist.id} className='flex flex-col'>
                            <h1>{artist.name}</h1>
                            <Image src={artist.avatarurl} alt={artist.name} width={200} height={200} />
                            <p>{artist.description}</p>
                        </div>
                    ))
                }
            </div>
        </Suspense>);
}