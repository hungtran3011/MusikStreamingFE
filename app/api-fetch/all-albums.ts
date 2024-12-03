import z from 'zod';
import axios from 'axios';

import type { Album } from '@/app/model/album';

const AlbumSchema = z.array(z.object({
    id: z.string(),
    title: z.string(),
    type: z.string(),
    thumbnailurl: z.string(),
    owner: z.string().optional(),
}));

const AlternativeAlbumSchema = z.object({
    data: z.array(z.object({
        id: z.string(),
        title: z.string(),
        type: z.string(),
        thumbnailurl: z.string(),
        owner: z.string().optional(),
    }))
});

export default async function fetchAllAlbums() {
    if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API URL not set');
    }
    try {
        const storedAlbums = localStorage.getItem("albums");
        const storedTime = localStorage.getItem("albumsTime");
        
        if (storedAlbums && storedTime && Date.now() - parseInt(storedTime) < 3600000) {
            try {
                const data = AlbumSchema.parse(JSON.parse(storedAlbums));
                return data as Album[];
            }
            catch {
                const data = AlternativeAlbumSchema.parse(JSON.parse(storedAlbums));
                return data.data as Album[];
            }
        }
        else {
            // const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/collection/albums?page=1&limit=20`, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });
            const res = await axios.get(`https://api.hustmusik.live/v1/collection/albums?page=1&limit=10`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(res.data);
            localStorage.setItem("albums", JSON.stringify(res.data));
            localStorage.setItem("albumsTime", Date.now().toString());
            try {
                const data = AlbumSchema.parse(res.data);
                return data as Album[];
            }
            catch {
                const data = AlternativeAlbumSchema.parse(res.data);
                return data.data as Album[];
            }
        }
    }
    catch {
        localStorage.removeItem("albums");
        localStorage.removeItem("albumsTime");
        return;
    }
}