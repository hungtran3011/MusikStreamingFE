'use client';
import NavRailCommonItem from './nav-rail-common-item';
import NavRailPinnedItem from './nav-rail-pinned-item';
import { useState, useEffect, useCallback } from 'react';
// import {useHistory}
import { usePathname } from 'next/navigation';
import useScreenWidth from '@/app/hooks/useScreenWidth';
import "./nav-rail.css";
import { NavItemType } from '@/app/model/nav-item-type';

/**
 * Navigation items configuration.
 */
const items = {
    'home': {
      text: 'Trang chủ',
      badgevalue: 0,
      href: '/',
      type: NavItemType.DEFAULT
    },
    'explore': {
      text: "Khám phá",
      badgevalue: 0,
      href: "/search",
      type: NavItemType.DEFAULT
    },
    'library_music': {
      text: 'Thư viện của bạn',
      badgevalue: 0,
      href: '/library',
      type: NavItemType.DEFAULT
    },
    'settings': {
      text: 'Cài đặt',
      badgevalue: 0,
      href: '/settings',
      type: NavItemType.DEFAULT
    },
  };

/**
 * NavRail component renders a navigation rail with common and pinned items.
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Additional class names for the component.
 * @param {Object} [props.pinned] - Pinned navigation items.
 * @param {number} [props.selected] - Index of the selected item.
 */
export default function NavRail(props) {
    // const [selected, setSelected] = useState(0);
    const [extended, setExtended] = useState(true);
    const pathname = usePathname();
    const screenWidth = useScreenWidth();

    // Handle window resize to toggle extended state
    const handleResize = useCallback(() => {
        if (screenWidth < 1024) {
            setExtended(false);
        } else {
            setExtended(true);
        }
    }, [screenWidth]);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    return (
        <div className={`${props.className} nav-rail ${screenWidth < 590 ? "hidden" : "flex"} w-full relative flex-col bg-[--md-sys-color-surface-container-low]  rounded-2xl nav-rail-${extended ? 'extended' : 'collapsed'}`}>
            <div className={`nav-rail-inner h-full nav-rail--padding-${extended ? 'extended' : 'collapsed'}`}>
                <button className={`extend-button selected-false rounded-full w-full`} role="button" onClick={() => { 
                    localStorage.setItem('nav-rail-extended', JSON.stringify(!extended));
                    setExtended(!extended);
                }}>
                    <div className={`state-layer rounded-full flex gap-4 relative padding-${extended ? "extended" : "collapsed"}`}>
                        <md-ripple/>
                        <span className="material-symbols-outlined block w-6">menu</span>
                        <p>{extended ? "Menu" : ""}</p>
                    </div>
                </button>
                <div className="nav-rail-common flex-col">
                    {
                        Object.keys(items).map((key) => {
                            const item = items[key];
                            
                            const imgSrc = item.img?.src || "/favicon.ico";
                            if (items[key].type === 0)
                                return <NavRailCommonItem
                                    key={key}
                                    icon={key}
                                    text={items[key].text}
                                    showBadge={items[key].badgevalue > 0}
                                    badgevalue={items[key].badgevalue}
                                    selected={pathname === items[key].href}
                                    href={items[key].href}
                                    // onClick={() => { setSelected(index) }}
                                    extended={extended}
                                />
                            else if (items[key].type === 1)
                                return <NavRailPinnedItem
                                    key={key}
                                    imgSrc={imgSrc}
                                    text={items[key].text}
                                    width={items[key].img.width}
                                    selected={pathname === items[key].href}
                                    href={items[key].href}
                                    // onClick={() => { setSelected(index) }}
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
                        ? Object.keys(props.pinned).map((key) => {
                            const pinned = props.pinned[key];
                            const imgSrc = pinned.img?.src || "/favicon.ico";

                            return <NavRailPinnedItem
                                key={key}
                                imgSrc={imgSrc}
                                text={props.pinned[key].text}
                                width={props.pinned[key].img.width}
                                href={props.pinned[key].href}
                                // onClick={() => { setSelected(index) }}
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