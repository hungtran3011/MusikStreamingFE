import axios from "axios";
import { Song } from "../model/song";
import z from "zod";

const SongSchema = z.object({
    id: z.string(),
    title: z.string(),
    thumbnailurl: z.string(),
    duration: z.number(),
    releasedate: z.string(),
    genre: z.string(),
    views: z.number()
});

export default async function fetchSongById(id: string) {
    try {
        if (localStorage.getItem("song-" + id)) {
            const data = SongSchema.parse(JSON.parse(localStorage.getItem("song-" + id)!));
            return data as Song;
        }
        else {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/song/${id}`);
            res.headers = {
                "Cache-Control": "max-age=60, stale-while-revalidate"
            }
            localStorage.setItem("song-" + id, JSON.stringify(res.data));
            const data = SongSchema.parse(res.data);
            return data as Song;
        }
    } catch {
        return;
    }
}