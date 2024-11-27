'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import fetchSongById from '@/app/api-fetch/song-by-id';
import ErrorComponent from '@/app/app-components/api-fetch-container/fetch-error';
import { Song } from '@/app/model/song';
import Skeleton from '@/app/app-components/loading/skeleton';
import { Suspense } from 'react';
import PlayButton from '@/app/app-components/buttons/play-button-main';

function processTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`;
}

function processDatetime(ISODate: string): string {
  const date = new Date(ISODate);
  return date.toLocaleDateString();
}

export default function SongContent(params: { id: string }) {
  const [song, setSong] = useState<Song>();
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const data = await params;
      const artist = await fetchSongById(data.id);
      if (!artist) return;
      setSong(artist);
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

  if (error) {
    return <ErrorComponent onReloadClick={fetchData} />;
  }

  try {
    return (
      <div className='flex w-full'>
        <div className="flex flex-col items-center w-full gap-12">
          <div className='flex items-center w-full gap-4'>
            <Suspense fallback={<Skeleton className="w-[200px] h-[200px]" />}>
              {
                song ? <Image
                  src={song.thumbnailurl}
                  alt={song.title}
                  width={200}
                  height={200}
                  priority={true}
                /> : <Skeleton className="w-[200px] h-[200px]" />
              }
            </Suspense>
            <div className="flex flex-col">
              {song ? <h1>{song.title}</h1> : <Skeleton className='h-4 w-full' />}
              {song ? <p>Genre: {song.genre}</p> : <Skeleton className='h-4 w-full' />}
              <PlayButton />
            </div>
          </div>
          {/* <div className='flex items-center'>
                                    <div className="flex w-full">
                                        <p>{song.title}</p>
                                    </div>
                                    <div className="flex w-full">
                                        <p>{processTime(song.duration)}</p>
                                    </div>
                                </div> */}
          <div className="w-full">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">#</th>
                  <th className="text-left">Title</th>
                  <th className="text-left">Durations</th>
                  <th className="text-left">Play</th>
                </tr>
              </thead>
              <tbody>
                <tr className="p-3">
                  <td>1</td>
                  
                  <Suspense fallback={<Skeleton className='h-4 w-full' />}>
                    <td className="py-3">
                      {
                        song
                          ? <p>{song.title}</p>
                          : <Skeleton className='h-4 w-full' />
                      }
                    </td>
                  </Suspense>
                  <td className="py-3">
                    {
                      song
                        ? <p>{processTime(song ? song.duration : 0)}</p>
                        : <Skeleton className='h-4 w-full' />
                    }
                  </td>
                  <td className="py-3">
                    {
                      song
                        ? <p>{song.views}</p>
                        : <Skeleton className='h-4 w-full' />
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-start w-full">
            {
              song
                ? <p>Release Date: {processDatetime(song.releasedate)}</p>
                : <Skeleton className='h-4 w-full' />
            }
            <p>Views: {song ? song.views : "0"}</p>
          </div>
        </div>

      </div>
    );
  } catch (e) {
    console.error(e);
    return <ErrorComponent onReloadClick={fetchData} />;
  }
}