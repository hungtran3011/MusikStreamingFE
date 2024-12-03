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
        <div className={`nav-item rounded-full cursor-pointer font-medium selected-${selected}`} role='link' onClick={onClick}>
            <Link className={`state-layer relative flex extended-gap-${extended} items-center justify-between rounded-full padding-${extended ? "extended" : "collapsed"}`} href={href}>
                <md-ripple/>
                <span className={`nav-item-content flex extended-gap-${extended} items-center`}>
                    <span className="image flex items-center">
                    <Image 
                        src={imgSrc} 
                        alt={text} 
                        width={width} 
                        height={width} 
                        unoptimized={true}
                        />
                    </span>
                    <span className={`label-container flex items-center extended-${extended}`}>
                        <p className={`label text-center inline extended-${extended}`}>{text}</p>
                    </span>
                </span>
            </Link>
        </div>
    );
}

