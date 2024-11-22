'use client';
;
import NavRailCommonItem from './nav-rail-common-item';
import NavRailPinnedItem from './nav-rail-pinned-item';
import { useState, useEffect } from 'react';
// import {useHistory}
import { usePathname } from 'next/navigation';
import "./nav-rail.css";

/**
 * NavRail component renders a navigation rail with common and pinned items.
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Additional class names for the component.
 * @param {Object} props.items - Navigation items.
 * @param {Object} [props.pinned] - Pinned navigation items.
 * @param {number} [props.selected] - Index of the selected item.
 */
export default function NavRail(props) {
    const [selected, setSelected] = useState(0);
    const [extended, setExtended] = useState(true);
    const pathname = usePathname();

    // Handle window resize to toggle extended state
    function handleResize() {
        if (window.innerWidth < 1024) {
            setExtended(false);
        } else {
            setExtended(true);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`${props.className} nav-rail relative flex-col bg-[--md-sys-color-surface-container-low] overflow-clip rounded-2xl nav-rail-${extended ? 'extended' : 'collapsed'}`}>
            <div className={`nav-rail-inner h-full hover:overflow-y-auto nav-rail--padding-${extended ? 'extended' : 'collapsed'}`}>
                <div className={`button selected-false rounded-full`} role="button" onClick={() => { 
                    localStorage.setItem('nav-rail-extended', JSON.stringify(!extended));
                    setExtended(!extended);
                }}>
                    <div className={`state-layer rounded-full flex gap-4 relative padding-${extended ? "extended" : "collapsed"}`}>
                        <md-ripple/>
                        <span className="material-symbols-outlined">menu</span>
                        <p>{extended ? "Menu" : ""}</p>
                    </div>
                </div>
                <div className="nav-rail-common flex-col">
                    {
                        Object.keys(props.items).map((key, index) => {
                            if (props.items[key].type === 1 && !props.items[key].img.src) {
                                props.items[key].img.src = "/favicon.ico";
                            }
                            if (props.items[key].type === 0)
                                return <NavRailCommonItem
                                    key={key}
                                    icon={key}
                                    text={props.items[key].text}
                                    showBadge={props.items[key].badgevalue > 0}
                                    badgevalue={props.items[key].badgevalue}
                                    selected={pathname === props.items[key].href}
                                    href={props.items[key].href}
                                    onClick={() => { setSelected(index) }}
                                    extended={extended}
                                />
                            else if (props.items[key].type === 1)
                                return <NavRailPinnedItem
                                    key={key}
                                    imgSrc={props.items[key].img.src}
                                    text={props.items[key].text}
                                    width={props.items[key].img.width}
                                    selected={pathname === props.items[key].href}
                                    href={props.items[key].href}
                                    onClick={() => { setSelected(index) }}
                                    extended={extended}
                                />
                        })
                    }
                </div>
                <div className="px-4">
                    <hr className='border-[--md-sys-color-outline-variant]'/>
                </div>
                <div className="nav-rail-pinned flex-col">
                    {
                        props.pinned !== undefined
                        ? Object.keys(props.pinned).map((key, index) => {
                            if (!props.pinned[key].img.src) {
                                props.pinned[key].img.src = "/favicon.ico";
                            }
                            return <NavRailPinnedItem
                                key={key}
                                imgSrc={props.pinned[key].img.src}
                                text={props.pinned[key].text}
                                width={props.pinned[key].img.width}
                                href={props.pinned[key].href}
                                onClick={() => { setSelected(index) }}
                                extended={extended}
                                selected={pathname === props.pinned[key].href}
                            />
                        })
                        : <></>
                    }
                </div>
            </div>
        </div>
    );
}