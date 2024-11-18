'use client'

import TextButton from "../buttons/text-button";
import 'material-symbols';
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./cards.css"
import { CardProps } from "@/app/model/card-props";
import Link from "next/link";

export default function HorizontalCard({
    img,
    title,
    subtitle,
    href,
    onClick = () => { }
}: CardProps) {
    const router = useRouter();
    return (
        <div className="horizontal-card song-card flex items-center gap-3 bg-[--md-sys-color-surface-variant] rounded-lg" role="link" onClick={
            () => {
                router.push(href);
            }
        }>
            <div className="image-frame flex justify-start">
                <Image
                    className="rounded-l-lg"
                    // src={"https://upload.wikimedia.org/wikipedia/en/4/4f/Lana_Del_Rey_-_Did_You_Know_That_There%27s_a_Tunnel_Under_Ocean_Blvd.png"}
                    src={img.src}
                    alt={title}
                    width={img.width}
                    height={img.width}
                >
                </Image>
            </div>
            <div className="title text-ellipsis line-clamp-1 w-full">
                <Link href={href} className="text-left">{title}</Link>
            </div>
            <div className="play-button-container">
                <div className="play-button w-12 ">
                    <TextButton className="" onClick={onClick}>
                        <span className="material-symbols-outlined icon-filled">play_arrow</span>
                    </TextButton>
                </div>
            </div>
        </div>
    );
}