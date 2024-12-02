'use client'

import Image from 'next/image';
import TextButton from '../buttons/text-button';
import './cards.css'

import { CardProps } from '@/app/model/card-props';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Skeleton from '../loading/skeleton';

/**
 * VerticalCard component displays content in a vertical card layout with an image, title, and subtitle.
 * It includes a play button overlay and navigation capabilities.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.img - The image object containing src and width properties
 * @param {string} props.img.src - The source URL of the image
 * @param {number} props.img.width - The width of the image in pixels
 * @param {string} props.title - The main title text to display
 * @param {string} props.subtitle - The secondary text to display
 * @param {string} props.href - The navigation link for the card
 * @param {function} [props.onClick] - Optional click handler for the play button
 * 
 * @returns {JSX.Element} A vertical card component with image, title, subtitle, and play button
 */
export default function VerticalCard({
  img,
  title,
  subtitle,
  href,
  onClick = () => { }
}: CardProps) {
  const router = useRouter();
  router.prefetch(href);
  return (
    <div className={`vertical-card song-card rounded-lg bg-[--md-sys-color-outline-variant] flex flex-col items-center justify-center overflow-hidden w-fit gap-3 pb-3`}>
      <div className={`cover-img self-stretch flex flex-col h-[140px] overflow-hidden transition-transform`}>
        <div className='max-h-[140px] overflow-clip'>
          <Link href={href} className='self-stretch h-auto'>
            {img.src ?
              <Image
                className="self-stretch rounded-t-lg"
                src={img.src}
                alt={title}
                width={img.width}
                height={img.width}
                priority={true}
              >
              </Image>
              : <Skeleton className="self-stretch rounded-t-lg h-[140px] w-140px rounded-b-none" />
            }
          </Link>
        </div>
        <div className="play-button-container w-full pr-1 pb-1 flex items-end justify-end">
          <div className="play-button w-12 bg-[--md-sys-color-primary] rounded-full">
            <TextButton className="play-button bg-[--md-sys-color-primary]" onClick={onClick}>
              <span className="material-symbols-outlined-filled text-[--md-sys-color-on-primary]">play_arrow</span>
            </TextButton>
          </div>
        </div>
      </div>
      <div className="title text-ellipsis flex items-center justify-center flex-wrap">
        <p className="line-clamp-1 text-md font-medium text-wrap max-w-[140px]">
          <Link href={href} className='hover:underline text-wrap text-center'>
            {title}
          </Link>
        </p>
      </div>
      <div className="subtitle text-ellipsis flex">
        <p className="line-clamp-1 text-sm">{subtitle}</p>
      </div>
    </div>
  )
}