// fetch api for all artists
'use client'
import type { Artist } from '@/app/model/artist';
import axios from 'axios';
import z from 'zod';

const ArtistSchema = z.object({
    data: z.array(z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
        avatarurl: z.string(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
        country: z.string().optional(),
        managerid: z.string().optional(),
    })),
});

export default async function fetchArtists() {
    if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API URL not set');
    }
    try {
        if (localStorage.getItem("artists") !== null || Date.now() - parseInt(localStorage.getItem("artistsTime")!) < 60000) {
            const data = ArtistSchema.parse(JSON.parse(localStorage.getItem("artists")!));
            return data["data"] as Artist[];
        }
        else {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/artist`);
            // parse to json
            res.headers = {
                "Cache-Control": "s-maxage=60, stale-while-revalidate"
            }
            localStorage.setItem("artists", JSON.stringify(res.data));
            const data = ArtistSchema.parse(res.data);
            return data["data"] as Artist[];
        }
    }
    catch {
        return;
    }
}