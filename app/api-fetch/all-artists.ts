// fetch api for all artists

import type { Artist } from '@/app/model/artist';
import axios, { Axios } from 'axios';

export default async function fetchArtists() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/artist`);
        // parse to json
        const data = res.data;
        return data["data"] as Artist[];
    }
    catch {
        return;
    }
}