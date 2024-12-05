import Image from 'next/image';
import Link from 'next/link';
import { SongDetails } from '@/app/model/song-details';

export default function ArtistLinks({ artists }: { artists: SongDetails['artists'] }) {
  return (
    <div className="flex items-center gap-4">
      {/* Cascading Avatars */}
      <div className="flex">
        {artists.map((artistData, index) => (
          <div 
            key={artistData.id}
            className={`relative rounded-full overflow-hidden ml-${index > 0 ? '-12px' : '0'}, z-[${artists.length - index}]`}
          >
            <Link href={`/artist/${artistData.id}`}>
              <Image
                src={artistData.avatarurl || '/assets/placeholder.jpg'}
                alt={artistData.name}
                width={40}
                height={40}
                className="rounded-full border-2 border-[--md-sys-color-surface]"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Artist Names */}
      <div className="flex flex-wrap gap-1 items-center">
        {artists.map((artistData, index) => (
          <span key={artistData.id}>
            <Link 
              href={`/artist/${artistData.id}`}
              className="font-medium hover:underline"
            >
              {artistData.name}
            </Link>
            {index < artists.length - 1 && ", "}
          </span>
        ))}
      </div>
    </div>
  );
}