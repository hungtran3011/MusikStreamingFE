import axios from "axios";
import { Song } from "../model/song";

export default async function fetchAllSongs() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/song?page=1&limit=10`);
        const data = res.data;
        return data["data"] as Song[];
    } catch {
        return;
    }
}