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
export default function NavRailPinnedItem(props) {
    if (props.extended === undefined) {
        props.extended = false;
    }
    if (props.selected === undefined) {
        props.selected = false;
    }
    if (props.onClick === undefined) {
        props.onClick = () => {
            console.log('No onClick handler defined');
        }
    }
    if (props.href === undefined) {
        props.href = '#';
    }
    return (
        <div className={`nav-item rounded-full cursor-pointer font-medium selected-${props.selected}`} role='link' onClick={props.onClick}>
            <Link className={`state-layer relative flex extended-gap-${props.extended} items-center justify-between rounded-full padding-${props.extended ? "extended" : "collapsed"}`} href={props.href}>
                <md-ripple/>
                <span className={`nav-item-content flex extended-gap-${props.extended} items-center`}>
                    <span className="image flex items-center">
                    <Image 
                        src={props.imgSrc} 
                        alt={props.text} 
                        width={props.width} 
                        height={props.width} 
                        unoptimized={true}
                        />
                    </span>
                    <span className={`label-container flex items-center extended-${props.extended}`}>
                        <p className={`label text-center inline extended-${props.extended}`}>{props.text}</p>
                    </span>
                </span>
                {/* <div className={`badge extended-${props.extended} rounded-full text-center flex items-center justify-center`}>
                    <p>{props.badgevalue}</p>
                </div> */}
            </Link>
        </div>
    );
}

