'use client';

import 'material-symbols';
import './nav-rail.css';
import '@material/material-color-utilities';
import '@material/web/ripple/ripple';
import Link from 'next/link';

export default function NavRailCommonItem(
    props: {
        icon: string,
        text: string,
        showBadge: boolean,
        badgevalue: number,
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
    if (props.showBadge === undefined) {
        props.showBadge = false;
    }
    if (props.badgevalue === undefined) {
        props.badgevalue = 0;
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
        <div className={`nav-item w-full rounded-full cursor-pointer font-medium selected-${props.selected}`} role='link' onClick={props.onClick}>
            <Link className={`state-layer w-full relative flex extended-gap-${props.extended} items-center justify-between rounded-full padding-${props.extended ? "extended" : "collapsed"}`} href={props.href!}>
                <md-ripple></md-ripple>
                <div className={`nav-item-content flex  w-full extended-gap-${props.extended} items-center`}>
                    <div className="icon flex items-center">
                        <span className='material-symbols-outlined'>{props.icon}</span>
                    </div>
                    <div className={`label-container flex items-center extended-${props.extended}`}>
                        <p className={`label text-center extended-${props.extended}`}>{props.text}</p>
                    </div>
                </div>
                <div className={`badge badge-show-${props.showBadge} extended-${props.extended} rounded-full text-center flex items-center justify-center`}>
                    <p>{props.badgevalue}</p>
                </div>
            </Link>
        </div>
    );
}