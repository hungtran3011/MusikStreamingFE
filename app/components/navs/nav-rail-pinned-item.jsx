import Image from 'next/image';
import Link from 'next/link';

/**
 * NavRailPinnedItem component
 * @param {Object} props - Component properties
 * @param {string} props.imgSrc - Source URL for the image
 * @param {number} props.width - Width of the image
 * @param {string} props.text - Text to display
 * @param {boolean} props.selected - Whether the item is selected
 * @param {function} [props.onClick] - Click handler function
 * @param {string} [props.href] - Link URL
 * @param {boolean} [props.extended] - Whether the item is extended
 */
export default function NavRailPinnedItem({
    imgSrc,
    width,
    text,
    selected = false,
    onClick = () => console.log('No onClick handler defined'),
    href = '#',
    extended = false
}) {
    return (
        <div className={`nav-item ${extended ? "rounded-full" : "rounded-sm w-fit"} flex cursor-pointer font-medium selected-${selected}`} role='link' onClick={onClick}>
            <Link className={`state-layer relative flex ${extended ? "gap-4 justify-start" : "gap-0 justify-center"} items-center ${extended ? "rounded-full" : "rounded-sm"} ${extended? "p-3 pl-4" : "p-0"} w-full`} href={href}>
                <md-ripple/>
                <div className={`nav-item-content flex extended-gap-${extended} items-center ${extended ? "justify-start" : "justify-center"}`}>
                    <div className={`image flex items-center justify-center rounded-sm ${extended ? 'w-10 h-10' : 'w-12 h-12'}`}>
                    <Image 
                        className='rounded-md'
                        src={imgSrc} 
                        alt={text} 
                        width={extended ? 40 : 48} 
                        height={extended ? 40 : 48} 
                        // unoptimized={true}
                        />
                    </div>
                    <div className={`label-container flex items-center extended-${extended} ${!extended ? "hidden" : ""}`}>
                        <p className={`label text-center inline extended-${extended}`}>{text}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

