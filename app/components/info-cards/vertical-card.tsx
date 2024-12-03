'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { CardProps } from '@/app/model/card-props';
import TextButton from '../buttons/text-button';
import Skeleton from '../loading/skeleton';

import './cards.css';

/**
 * VerticalCard component displays content in a vertical card layout with an image, title, and subtitle.
 * It includes a play button overlay and navigation capabilities.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.img - The image object containing src and width properties
 * @param {string} props.img.src - The source URL of the image
 * @param {number} [props.img.width] - The width of the image in pixels
 * @param {string} props.title - The main title text to display
 * @param {string} props.subtitle - The secondary text to display
 * @param {string} props.href - The navigation link for the card
 * @param {string} [props.subHref] - The navigation link for the subtitle
 * @param {function} [props.onClick] - Optional click handler for the play button
 * 
 * @returns {JSX.Element} A vertical card component with image, title, subtitle, and play button
 */
export default function VerticalCard({
  img,
  title,
  subtitle,
  href,
  subHref = href,
  isMultipleItemSub = false,
  subHrefItems,
  subItems,
  onClick = () => { }
}: CardProps) {
  const router = useRouter();
  const [play, setPlay] = useState(false);
  router.prefetch(href);
  if (!isMultipleItemSub && subHrefItems) {
    subHref = subHrefItems[0];
  }
  return (
    <div 
      className="vertical-card song-card rounded-lg bg-[--md-sys-color-outline-variant] flex flex-col items-center justify-start overflow-hidden w-full max-w-[280px] sm:max-w-[200px] h-full" 
      onClick={() => router.push(href)}
    >
      <div className="cover-img relative w-full aspect-square overflow-hidden bg-[--md-sys-color-surface-container]">
        <div className="w-full h-full group">
          {img.src ? (
            <>
              <Image
                className="rounded-t-lg object-cover w-full h-full transition-transform duration-300 group-hover:scale-125 group-hover:brightness-50"
                src={img.src}
                alt={title}
                fill={true}
                sizes="(max-width: 640px) 280px, 200px"
                priority={true}
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <Skeleton className="w-full h-full rounded-t-lg rounded-b-none" />
          )}
        </div>
        <div className="play-button-container absolute bottom-2 right-2">
          <div className="play-button hidden song-card:hover:block w-12 bg-[--md-sys-color-primary] rounded-full overflow-hidden">
            <TextButton 
              className="play-button bg-[--md-sys-color-primary] hidden song-card:hover:block" 
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onClick();
                setPlay(!play);
              }}
            >
              <span className="material-symbols-outlined-filled text-[--md-sys-color-on-primary]">{play ? 'pause' : 'play_arrow'}</span>
            </TextButton>
          </div>
        </div>
      </div>
      <div className="px-2 w-full py-3 flex flex-col justify-between min-h-[4rem]">
        <div className="title mb-1">
          <Link href={href} className="line-clamp-1 text-md font-medium text-center hover:underline">
            {title}
          </Link>
        </div>
        <div className="subtitle">
          {
            isMultipleItemSub ? (
              <div className="flex flex-wrap gap-1">
                {subItems?.map((item, index) => (
                  <div key={index} className="line-clamp-1 text-sm text-center hover:underline">{item}</div>
                ))}
              </div>
            ) : (
              <Link href={subHref} onClick={(e) => e.stopPropagation()} className="line-clamp-1 text-sm text-center hover:underline">{subtitle}</Link>
            )
          }
        </div>
      </div>
    </div>
  )
}