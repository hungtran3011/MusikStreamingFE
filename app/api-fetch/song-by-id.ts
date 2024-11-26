import axios from "axios";
import { Song } from "../model/song";
import z from "zod";
import { SongDetails } from "../model/song-details";
import { arch } from "os";

const SongSchema = z.object({
    data: z.object({
        id: z.string(),
        title: z.string(),
        thumbnailurl: z.string(),
        duration: z.number(),
        releasedate: z.string(),
        genre: z.string(),
        views: z.number(),
        albums: z.array(
            z.object({
                album: z.object({
                    id: z.string(),
                    type: z.string(),
                    title: z.string(),
                    thumbnailurl: z.string(),
                })
            })
        ),
        artists: z.array(z.object({
            id: z.string(),
            name: z.string(),
            avatarurl: z.string(),
        })
        )
    })
});

export default async function fetchSongById(id: string) {
    try {
        if (localStorage.getItem("song-" + id) !== null && localStorage.getItem("songTime-" + id) === null) {
            localStorage.removeItem("song-" + id);
        }
        // xoá cache nếu đã quá 1 phút
        if (Date.now() - parseInt(localStorage.getItem("songTime-" + id)!) > 60000) {
            localStorage.removeItem("song-" + id);
        }
        if (localStorage.getItem("song-" + id) || Date.now() - parseInt(localStorage.getItem("songTime-" + id)!) < 60000) {
            const data = SongSchema.parse(JSON.parse(localStorage.getItem("song-" + id)!));
            return data["data"] as SongDetails;
        }
        else {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/song/${id}`);
            res.headers = {
                "Cache-Control": "max-age=60, stale-while-revalidate"
            }
            localStorage.setItem("song-" + id, JSON.stringify(res.data));
            localStorage.setItem("songTime-" + id, Date.now().toString());
            const data = SongSchema.parse(res.data);
            return data["data"] as SongDetails;
        }
    } catch {
        localStorage.removeItem("song-" + id);
        localStorage.removeItem("songTime-" + id);
        return;
    }
}