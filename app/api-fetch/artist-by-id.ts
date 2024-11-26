import { Artist } from "@//app/model/artist";
import axios from "axios";
import z from 'zod';

const ArtistSchema = z.array(
    z.object({
        id: z.string(),
        name: z.string(),
        avatarurl: z.string(),
        country: z.string().optional().nullable(),
        description: z.string().optional().nullable(),
        managerid: z.string().optional().nullable(),
    })
);

/**
 * Fetches artist information from the API by their ID
 * 
 * @param id - The unique identifier of the artist to fetch
 * @returns Promise<Artist[]> - A promise that resolves to an array of Artist objects
 *                             Returns empty array if the fetch fails
 * 
 * @example
 * const artists = await fetchArtistById("123");
 * 
 * @throws {Error} When the network request fails
 * @remarks
 * - The function logs the ID to console for debugging purposes
 * - Error responses are caught and logged to console
 */
export default async function fetchArtistById(id: string) {
    console.log(`Fetching artist with ID: ${id}`);
    try {
        if (localStorage.getItem("artist-" + id) !== null && localStorage.getItem("artistTime-" + id) === null) {
            localStorage.removeItem("artist-" + id);
        }
        if (localStorage.getItem("artist-" + id) !== null || Date.now() - parseInt(localStorage.getItem("artistTime-" + id)!) < 30000) {
            const data = ArtistSchema.parse(JSON.parse(localStorage.getItem("artist-" + id)!));
            return data[0] as Artist;
        }
        else {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/artist/${id}`);
            response.headers = {
                "Cache-Control": "max-age=60, stale-while-revalidate"
            }
            const data = ArtistSchema.parse(response.data);
            localStorage.setItem("artist-" + id, JSON.stringify(response.data));
            localStorage.setItem("artistTime-" + id, Date.now().toString());
            return data[0] as Artist;
        }
    } catch (error) {
        localStorage.removeItem("artist-" + id);
        localStorage.removeItem("artistTime-" + id);
        console.error(error);
        return null;
    }
}