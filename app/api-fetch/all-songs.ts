import axios from "axios";
import { Song } from "../model/song";
import z from "zod";

const SongListSchema = z.array(z.object({
    id: z.string(),
    title: z.string(),
    thumbnailurl: z.string(),
    duration: z.number(),
    releasedate: z.string(),
    genre: z.string(),
    views: z.number()
}));

export default async function fetchAllSongs() {
    try {
        localStorage.getItem("songs");
        if (localStorage.getItem("songs") !== null && localStorage.getItem("songsTime") === null) {
            localStorage.removeItem("songs");
        }
        // xoá cache nếu đã quá 1 phút
        if (localStorage.getItem("songs") !== null || Date.now() - parseInt(localStorage.getItem("songsTime")!) < 3600000) {
            const data = SongListSchema.parse(JSON.parse(localStorage.getItem("songs")!));
            return data as Song[];
        }
        else {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/song?page=1&limit=30`, {
                headers: {
                    'Cache-Control': 'max-age=3600000, stale-while-revalidate',
                }
            });
            localStorage.setItem("songs", JSON.stringify(res.data));
            localStorage.setItem("songsTime", Date.now().toString());
            console.log(res.data);
            const data = SongListSchema.parse(res.data);
            return data as Song[];
        }
        
    } catch {
        localStorage.removeItem("songs");
        localStorage.removeItem("songsTime");
        return;
    }
}