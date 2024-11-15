import Image from 'next/image';
import Link from 'next/link';
import '@material/web/ripple/ripple';

export default function NavRailPinnedItem(
    props: {
        imgSrc: string,
        width: number,
        text: string,
        selected: boolean,
        onClick?: () => void,
        href?: string,
        extended?: boolean
    }
) {
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
            <Link className={`state-layer relative flex extended-gap-${props.extended} items-center justify-between rounded-full padding-${props.extended ? "extended" : "collapsed"}`} href={props.href!}>
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

