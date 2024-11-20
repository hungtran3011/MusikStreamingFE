import axios from "axios";
import { Song } from "../model/song";
import z from "zod";

const SongSchema = z.object({
    data: z.array(z.object({
        id: z.string(),
        title: z.string(),
        genre: z.string(),
        thumbnailurl: z.string(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
        artistid: z.string().optional(),
        albumid: z.string().optional(),
        songurl: z.string().optional(),
    })),
});

export default async function fetchAllSongs() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/song?page=1&limit=10`);
        const data = SongSchema.parse(res.data);
        return data["data"] as Song[];
    } catch {
        return;
    }
}