import Link from 'next/link'
import { Artist } from '@/app/model/artist'
import fetchArtistById from '@/app/api-fetch/artist-by-id'

/**
 * A component that fetches an artist by their ID and returns a link to their page
 * 
 * @param artistID - The ID of the artist to fetch
 * @returns Promise<JSX.Element> - A promise that resolves to a JSX element
 * 
 * @example
 * const artistLink = await ArtistLink({artistID: "123"});
 */

export default async function ArtistLink({artistID}: {artistID: string}) {
    const artist = await fetchArtistById(artistID);
    if(artist){
      return (
        <Link href={`/artist/${artist.id}`}>
          <a className="text-blue-500 hover:text-blue-700">{artist.name}</a>
        </Link>
      )
    }
}