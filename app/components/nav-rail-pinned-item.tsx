import Image from 'next/image';
import Link from 'next/link';

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
        <div className={`nav-item-common flex items-center rounded-full cursor-pointer font-medium selected-${props.selected}`} role='link' onClick={props.onClick}>
            <Link className={`state-layer flex extended-gap-${props.extended} items-center justify-between rounded-full ${!props.extended ? 'max-w-6' : ""} padding-${props.extended ? "extended" : "collapsed"}`} href={props.href!}>
                <div className={`nav-item-content flex extended-gap-${props.extended} items-center`}>
                    <div className="cover flex items-center">
                        <Image src={props.imgSrc} alt={props.text} width={props.width} height={props.width} />
                    </div>
                    <div className={`label-container text-ellipsis items-center extended-${props.extended}`}>
                        <p className={`label text-center text-ellipsis extended-${props.extended}`}>{props.text}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

