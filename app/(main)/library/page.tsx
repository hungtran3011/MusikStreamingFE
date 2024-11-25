import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MusikStreaming | Library",
    description: "New music streaming app, using Material Design",
};

export default function Library(){
    return (
        <div className="library-page">
            <h1 className="library-title">Library</h1>
        </div>
    )
}