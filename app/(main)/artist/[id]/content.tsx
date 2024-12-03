'use client';
import { useState, useEffect, useCallback } from 'react';
import fetchArtistById from '@/app/api-fetch/artist-by-id';
import { Artist } from '@/app/model/artist';
import Image from 'next/image';
import Skeleton from '@/app/components/loading/skeleton';
import ErrorComponent from '@/app/components/api-fetch-container/fetch-error';

export default function ArtistContent({ params } : { params: Promise<{ id: string }> }) {
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

    if (error) {
        return <ErrorComponent onReloadClick={fetchData} />;
    }

    try {
        return (
            // <Suspense fallback={<Loading/>}>
            <div className='flex w-full'>
                <div className='flex flex-col justify-start items-center w-full'>
                    <div className='flex items-center gap-4 w-full'>
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
                        {
                            artist ? <h1 className='text-2xl font-bold'>{artist.name}</h1> : <Skeleton className="w-[200px] h-6"/>
                        }
                    </div>
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
}