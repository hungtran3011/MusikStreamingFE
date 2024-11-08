'use client';
import 'material-symbols';
import '@material/web/ripple/ripple';
import NavRailCommonItem from './nav-rail-common-item';
import NavRailPinnedItem from './nav-rail-pinned-item';
import { useState } from 'react';
import { NavItemData } from '../model/nav-item-data';
import "./nav-rail.css";
import { useMediaQuery } from '@mui/material';

export default function NavRail(
    props: {
        items: {
            [key: string]: NavItemData
        },
        selected: number
    }
) {
    const [selected, setSelected] = useState(props.selected);
    const [extended, setExtended] = useState(useMediaQuery('(min-width: 768px)'));
    return (
        <div className={`nav-rail nav-rail--padding-${extended?'extended':'collapsed'} bg-[--md-sys-color-surface-container-low] max-w-[352px] rounded-2xl sticky ${extended ? 'extended' : 'collapsed'}`}>
            <div className={`button selected-false rounded-full`} role="button" onClick={() => {
                setExtended(!extended);
            }}>
                <div className={`state-layer rounded-full flex gap-4 relative padding-${extended ? "extended" : "collapsed"}`}>
                    <md-ripple/>
                    <span className="material-symbols-outlined">menu</span>
                    <p>{extended ? "Menu" : ""}</p>
                </div>
            </div>
            <div className="nav-rail-common">
                {
                    Object.keys(props.items).map((key: string, index: number) => {
                        if (props.items[key]['type'] === 1 && props.items[key]['img']!['src'] === undefined) {
                            props.items[key]['img']!['src'] = "/favicon.ico";
                        }
                        if (props.items[key]['type'] === 0)
                            return <NavRailCommonItem
                                key={key}
                                icon={key}
                                text={props.items[key]['text']}
                                showBadge={props.items[key]['badgevalue']! > 0}
                                badgevalue={props.items[key]['badgevalue']!}
                                selected={selected === index}
                                href={props.items[key]['href']}
                                onClick={() => { setSelected(index) }}
                                extended={extended}
                            />
                        else if (props.items[key]['type'] === 1)
                            return <NavRailPinnedItem
                                key={key}
                                imgSrc={props.items[key]['img']!['src']}
                                text={props.items[key]['text']}
                                width={props.items[key]['img']!['width']}
                                selected={selected === index}
                                href={props.items[key]['href']}
                                onClick={() => { setSelected(index) }}
                                extended={extended}
                            />
                        else
                            return <NavRailCommonItem
                                key={key}
                                icon={key}
                                text={props.items[key]['text']}
                                showBadge={props.items[key]['badgevalue']! > 0}
                                badgevalue={props.items[key]['badgevalue']!}
                                selected={selected === index}
                                href={props.items[key]['href']}
                                onClick={() => { setSelected(index) }}
                                extended={extended}
                            />
                    })
                }
            </div>
            {/* <hr className={`divider--${extended}`} /> */}
            <div className="nav-rail-common transition-transform duration-300 ease-in-out">
                {/* Additional content can be added here */}
            </div>
        </div>
    );
}