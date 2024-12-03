'use client';
import NavRailCommonItem from './nav-rail-common-item';
import NavRailPinnedItem from './nav-rail-pinned-item';
import { useState, useEffect, useCallback } from 'react';
// import {useHistory}
import { usePathname } from 'next/navigation';
import "./nav-rail.css";
import { NavItemType } from '@/app/model/nav-item-type';
import { getCookie } from 'cookies-next';

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
    const [extended, setExtended] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);
    const [pinnedItems, setPinnedItems] = useState({});
    const pathname = usePathname();

    const handleResize = useCallback(() => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth < 1024) {
                setExtended(false);
            } else {
                setExtended(true);
            }
        }
    }, []);

    useEffect(() => {
        const checkAuth = () => {
            const accessToken = getCookie("access_token");
            
            // If logged in, set up pinned items
            if (accessToken) {
                setPinnedItems({
                    'favorite': {
                        text: 'Yêu thích',
                        href: '/favorites',
                        img: {
                            src: '/assets/favorite-icon.png',
                            width: 24
                        },
                        type: NavItemType.DEFAULT
                    },
                    'playlist': {
                        text: 'Playlist của bạn',
                        href: '/playlists',
                        img: {
                            src: '/assets/playlist-icon.png',
                            width: 24
                        },
                        type: NavItemType.DEFAULT
                    }
                });
            } else {
                setPinnedItems({});
            }
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize window width
            setWindowWidth(window.innerWidth);
            // Initialize 'extended' state from localStorage or window width
            const storedExtended = localStorage.getItem('nav-rail-extended');
            if (storedExtended !== null) {
                setExtended(JSON.parse(storedExtended));
            } else {
                setExtended(window.innerWidth >= 1024);
            }
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [handleResize]);

    return (
        <div className={`${props.className} nav-rail ${windowWidth < 590 ? "hidden" : "flex"} w-full relative flex-col bg-[--md-sys-color-surface-container-low]  rounded-2xl nav-rail-${extended ? 'extended' : 'collapsed'}`}>
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
                        Object.keys(pinnedItems).map((key) => {
                            const pinned = pinnedItems[key];
                            const imgSrc = pinned.img?.src || "/favicon.ico";

                            return <NavRailPinnedItem
                                key={key}
                                imgSrc={imgSrc}
                                text={pinnedItems[key].text}
                                width={pinnedItems[key].img.width}
                                href={pinnedItems[key].href}
                                extended={extended}
                                selected={pathname === pinnedItems[key].href}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    );
}