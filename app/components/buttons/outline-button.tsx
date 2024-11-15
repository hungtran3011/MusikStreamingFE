'use client'
import { ImageProps } from '@/app/model/image-props';
import '@material/web/ripple/ripple';
import Image from 'next/image';

export default function OutlinedButton(
    props: {
        className?: string,
        onClick: () => void,
        icon?: string,
        showIcon?: boolean,
        leadingImg?: ImageProps,
        showLeadingImg?: boolean,
        children?: string,
    }
) {
    let showIcon = props.showIcon;
    if (props.icon === undefined || props.icon === '') {
        showIcon = false;
    }
    else if (props.showIcon === undefined) {
        showIcon = false;
    }
    return(
        <div className={`text-btn flex border-2 rounded-full border-[--md-sys-color-outline] items-center justify-stretch focus:ring ${props.className}`} role='button' onClick={props.onClick}>
            <div className={`state-layer p-4 relative ${showIcon?"":"pr-6"} gap-3 rounded-full flex items-center justify-center text-[--md-sys-color-primary] flex-grow`}>
                <md-ripple className="ripple"/>
                {
                    props.showLeadingImg
                    ? <Image
                    src={props.leadingImg!.src}
                    alt={props.leadingImg!.alt}
                    width={18}
                    height={18}
                    ></Image>
                    : <></>
                }
                <span className={`material-symbols-outlined ${showIcon ? "block" : "none"} block`}>{props.icon}</span>
                <span className='text-center font-medium block'>{props.children}</span>
            </div>
        </div>
    )
}