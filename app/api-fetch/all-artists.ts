// fetch api for all artists

import type { Artist } from '@/app/model/artist';

export default async function fetchArtists() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/artist`);
        // parse to json
        const data = await res.json();
        return data["data"] as Artist[];
    }
    catch {
        return;
    }
}