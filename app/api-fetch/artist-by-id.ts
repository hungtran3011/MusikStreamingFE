import { Artist } from "../model/artist";
import axios, {Axios} from "axios";

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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/artist/${id}`);
        return response.data as Artist[];
    } catch (error) {
        console.error(error);
        return [];
    }
}