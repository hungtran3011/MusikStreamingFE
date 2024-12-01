import fetchSongById from "@/app/api-fetch/song-by-id";
import SongContent from "./content";

export async function generateMetadata({params}: {params: {id: string}}) {
  const paramsData = await params;
  const id = paramsData.id;
  const data = await fetchSongById(id);
  console.log(data);
  if (!data) {
    return {
      title: "Song not found",
      description: "This song does not exist",
    };
  }
  return {
    title: data.title,
    description: `Song by ${data.artists.map((artist) => artist.artist.name).join(", ")}`,
  };
}

export default async function SongPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return (
    <SongContent id={id}/>
  )
}