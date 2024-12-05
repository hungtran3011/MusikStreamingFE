import z from "zod";
import axios from "axios";

const songFileSchema = z.object({
  url: z.string(),
});

export default async function getSong(id: string){
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/song/${id}/presigned/stream`);
  const data = songFileSchema.parse(res.data);
  return data;
}
