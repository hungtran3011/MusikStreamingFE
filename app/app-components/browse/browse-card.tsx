import Link from "next/link";
import Image from "next/image";
import type { BrowseTypeProps } from "@/app/model/browse-type-props";
import { twJoin } from "tailwind-merge";
import {clsx} from "clsx"


export default function BrowseCard({
  title,
  image,
  bgColour,
  textColour,
  url
}: BrowseTypeProps
) {
  const backgroundColour = "bg[" + bgColour + "]";
  const text = "text=[" + textColour + "]";
  return (
    <div className = { twJoin(clsx(`browse-card rounded-2xl flex flex-col items-center justify-center gap-4 overflow-hidden`, backgroundColour, text))}>
      <h2 className="browse-card-title text-xl font-bold p-3 max-w-[152px]">
        <Link href={url} className="text-wrap">{title}</Link>
      </h2>
      <Link href={url}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.width}
          className="browse-card-image rounded-b-2xl hover:scale-105"
        />
      </Link>
    </div>
  )
}