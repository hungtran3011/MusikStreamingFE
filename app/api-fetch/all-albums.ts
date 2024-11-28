import z from 'zod';
import axios from 'axios';

import type { Album } from '@/app/model/album';

const AlbumSchema = z.object({
    data: z.array(z.object({
        id: z.string(),
        title: z.string(),
        type: z.string(),
        thumbnailurl: z.string(),
        owner: z.string().optional(),
    })),
});

export default async function fetchAllAlbums() {
    if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API URL not set');
    }
    try {
        if (localStorage.getItem("albums") !== null || Date.now() - parseInt(localStorage.getItem("albumsTime")!) < 3600000) {
            const data = AlbumSchema.parse(JSON.parse(localStorage.getItem("albums")!));
            return data["data"] as Album[];
        }
        else {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/album`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            localStorage.setItem("albums", JSON.stringify(res.data));
            const data = AlbumSchema.parse(res.data);
            return data["data"] as Album[];
        }
    }
    catch {
        localStorage.removeItem("albums");
        localStorage.removeItem("albumsTime");
        return;
    }
}