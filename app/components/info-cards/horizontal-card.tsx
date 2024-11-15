'use client'

import type {CardProps} from "../../model/card-props";
import TextButton from "../buttons/text-button";
import 'material-symbols';
import Image from "next/image";
import "./cards.css"

export default function HorizontalCard({
//   info: CardProps
}) {
    return (
        <div className="horizontal-card song-card flex items-center gap-3 bg-[--md-sys-color-surface-variant] rounded-lg min-w-[140px]">
            <div className="image-frame flex w-full justify-start">
                <Image
                    className="self-stretch rounded-l-lg"
                    src={"https://upload.wikimedia.org/wikipedia/en/4/4f/Lana_Del_Rey_-_Did_You_Know_That_There%27s_a_Tunnel_Under_Ocean_Blvd.png"}
                    alt={"BLVD"}
                    width={60}
                    height={60}
                >
                </Image>
            </div>
            <div className="title text-ellipsis line-clamp-2">
                <p className="">{"Did you know that there's a tunnel under Ocean Blvd"}</p>
            </div>
            <div className="play-button-container">
                <div className="play-button w-12 ">
                    <TextButton className="">
                        <span className="material-symbols-outlined icon-filled">play_arrow</span>
                    </TextButton>
                </div>
            </div>
        </div>
    );
}