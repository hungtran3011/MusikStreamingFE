import { Artist } from "../model/artist";

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
    try {
        console.log(id);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/artist/${id}`);
        // if (!res.ok) {
        //     throw new Error(`Error fetching artist: ${res.statusText}`);
        // }
        const data = await res.json();
        const artists = data["data"] as Artist[];
        return artists;
    } catch (error) {
        console.error(error);
        return [];
    }
}