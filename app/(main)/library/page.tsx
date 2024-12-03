import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {cookies} from "next/headers";

export const metadata: Metadata = {
    title: "MusikStreaming | Library",
    description: "New music streaming app, using Material Design",
};

export default async function Library(){
    const cookieStore = await cookies();
    if (cookieStore.has("accessToken")) {
        return (
            <div className="library-page">
                <h1 className="library-title">Library</h1>
            </div>
        )
    }
    else {
        redirect("/login");
    }
}