'use client'

import TextButton from "../buttons/text-button";
import 'material-symbols';
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./cards.css"
import { CardProps } from "@/app/model/card-props";
import Link from "next/link";

/**
 * HorizontalCard Component
 * 
 * A horizontal card that displays an image, title, and a play button. The card is clickable and navigates to the provided href.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.img - Image object containing src, width, and height
 * @param {string} props.img.src - Source URL of the image
 * @param {number} props.img.width - Width of the image
 * @param {number} props.img.height - Height of the image
 * @param {string} props.title - Title text to display
 * @param {string} props.subtitle - Subtitle text to display
 * @param {string} props.href - URL to navigate to when the card is clicked
 * @param {Function} [props.onClick] - Optional click handler for the play button
 */
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