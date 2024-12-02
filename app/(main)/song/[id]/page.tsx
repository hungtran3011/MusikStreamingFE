import SongContent from "./content";
import fetchSongByIdServer from "@/app/api-fetch/song-id-server";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const song = await fetchSongByIdServer(id);
  if (song) {
    return {
      title: song.title,
      description: `${song.title} - ${song.artists.map(artist => artist.name).join(', ')}`,
    };
  }
  else {
    return {
      title: 'Song not found',
      description: 'The song you are looking for is not found',
    }
  }
}

export default async function SongPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return (
    <SongContent id={id}/>
  )
}