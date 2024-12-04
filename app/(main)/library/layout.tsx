import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MusikStreaming | Library",
    description: "Access your music library on MusikStreaming, using Material Design",
};

export default function LibraryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>{children}</div>
    )
}
