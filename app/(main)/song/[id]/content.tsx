'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import fetchSongById from '@/app/api-fetch/song-by-id';
import ErrorComponent from '@/app/components/api-fetch-container/fetch-error';
import { SongDetails } from '@/app/model/song-details';
import Skeleton from '@/app/components/loading/skeleton';
import PlayButton from '@/app/components/buttons/play-button-main';
import IconSmallButton from '@/app/components/buttons/icon-small-button';
import ArtistLinks from './artist-link';
import ToggleIconButton from '@/app/components/buttons/toggle-button';

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
  const [song, setSong] = useState<SongDetails>();
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const {id} = params;
      const songData = await fetchSongById(id);
      if (songData) {
        setSong(songData);
      }
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
      <div className='flex flex-col w-full gap-8 p-4'>
        {/* Hero Section */}
        <div className='flex flex-col md:flex-row items-center gap-6'>
          {song ? 
            <Image
              src={song.thumbnailurl}
              alt={song.title}
              width={200}
              height={200}
              priority={true}
              className="rounded-lg shadow-lg"
            /> : 
            <Skeleton className="w-[200px] h-[200px] rounded-lg" />
          }
          <div className="flex flex-col gap-3 w-full">
            {song ? 
              <h1 className='font-bold text-2xl md:text-3xl'>{song.title}</h1> : 
              <Skeleton className='h-8 w-full' />
            }
            {song?.artists ?
              <ArtistLinks artists={song.artists} /> :
              <Skeleton className='h-10 w-2/3' />
            }
            <div className="mt-4 flex justify-start items-center gap-4">
              <PlayButton className="bg-[--md-sys-color-primary] text-[--md-sys-color-on-primary] w-12 h-12"/>
              <IconSmallButton>
                <span className="material-symbols-outlined">share</span>
              </IconSmallButton>
              <ToggleIconButton>
                favorite
              </ToggleIconButton>
              <IconSmallButton>
                <span className="material-symbols-outlined">more_vert</span>
              </IconSmallButton>
            </div>
          </div>
        </div>

        {/* Song Details Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead className="">
              <tr>
                <th className="text-left py-3 hidden md:table-cell">#</th>
                <th className="text-left py-3">Title</th>
                <th className="text-left py-3">Duration</th>
                <th className="text-left py-3">Plays</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[--md-sys-color-surface-container-highest]">
                <td className="py-4 hidden md:table-cell">1</td>
                <td className="py-4">
                  {song ? 
                    <p>{song.title}</p> :
                    <Skeleton className='h-4 w-full' />
                  }
                </td>
                <td className="py-4">
                  {song ?
                    <p>{processTime(song.duration)}</p> :
                    <Skeleton className='h-4 w-full' />
                  }
                </td>
                <td className="py-4">
                  {song ?
                    <p>{song.views.toLocaleString()}</p> :
                    <Skeleton className='h-4 w-full' />
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Additional Info */}
        <div className="flex flex-col gap-3 w-full pt-6">
          {song ?
            <p className="">Release Date: {processDatetime(song.releasedate)}</p> :
            <Skeleton className='h-4 w-48' />
          }
          {song ?
            <p className="">Total Views: {song.views.toLocaleString()}</p> :
            <Skeleton className='h-4 w-32' />
          }
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    return <ErrorComponent onReloadClick={fetchData} />;
  }
}