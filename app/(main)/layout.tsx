/**
 * RootLayout component for the MusikStreaming app.
 * This component sets up the main layout structure including the navigation bar,
 * navigation rail, content area, and the song playing section.
 */

'use client'

import {Inter} from "next/font/google";
import "../globals.css";
import "material-symbols/outlined.css";
// import "../components/theme"
import TextButton from "../components/buttons/text-button";
import NavBar from "../components/navs/nav-bar";
import NavRail from "../components/navs/nav-rail";
import Image from "next/image";
import Link from "next/link";
import { NavItemData } from "../model/nav-item-props";
import { useEffect } from "react";
import { useState } from "react";

/**
 * Navigation items data.
 */
const items: { [key: string]: NavItemData } = {
  'home': {
      text: 'Home',
      badgevalue: 0,
      href: '/',
      type: 0
  },
  'library_music': {
      text: 'Your library',
      badgevalue: 0,
      href: '/library',
      type: 0
  },
  'favorite': {
      text: 'Favorites',
      badgevalue: 0,
      href: '/favorites',
      type: 0
  },
  'settings': {
      text: 'Settings',
      badgevalue: 0,
      href: '/settings',
      type: 0
  },
};

const inter = Inter({
  weight: "400",
});

/**
 * RootLayout component.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  function handleLyricsToggle() {
    setLyricsToggled(!lyricsToggled);
  }

  function handleTime(e: React.ChangeEvent<HTMLInputElement>) {
    setTime(Number(e.target.value));
  }

  const [lyricsToggled, setLyricsToggled] = useState(false);
  const [time, setTime] = useState(0);
  return (
    <html lang="en">
      <body
        className={`${inter} ${inter} antialiased`}
      >
      <NavBar></NavBar>
      <div className="content flex p-4 pr-1 gap-4 flex-grow flex-1 justify-stretch">
        <NavRail className={""} items={items} />
        <div className="center-scroll overflow-hidden flex-grow">
            <div className="center-scroll-inner flex items-start h-full bg-[--md-sys-color-surface-container-low] rounded-xl px-4 py-6">
            {children}
            </div>
        </div>
      </div>
      <div className="song-playing z-[1000] bg-[--md-sys-color-inverse-on-surface] p-4 gap-4 flex flex-wrap-reverse items-center justify-between">
        <div className="song-title flex items-center gap-2 w-1/6">
          <Image src={"/favicon.ico"} alt="song-playing" width={64} height={64}/>
          <div className="song-title-info">
            <p className="song-title-text">Song title</p>
            <p className="song-artist">Artist</p>
          </div>
          <span className="material-symbols-outlined">favorite</span>
        </div>
        <div className="song-controls-container flex-col w-1/3">
          <div className="song-controls flex items-center justify-center gap-4">
            <TextButton>
              <span className="material-symbols-outlined icon-filled">skip_previous</span>
            </TextButton>
            <TextButton>
              <span className="material-symbols-outlined icon-filled">play_arrow</span>
            </TextButton>
            <TextButton>
              <span className="material-symbols-outlined icon-filled">skip_next</span>
            </TextButton>
          </div>
          <div className="song-progress flex items-center gap-4">
            <p>{time}</p>
            {/* <div className="song-progress-bar flex-grow bg-[--md-sys-color-on-surface] h-1 rounded-full overflow-clip">
              <div className="song-progress-bar-inner bg-[--md-sys-color-primary] h-full rounded-full"></div>
            </div> */}
            <input type="range" aria-label="input" className="w-full" />
            <p>3:00</p>
          </div>
        </div>
        <div className="right-controls w-1/6 flex items-end justify-end">
          <TextButton onClick={handleLyricsToggle}>
              <span className={`material-symbols-outlined ${lyricsToggled ? "icon-filled" : "icon"}`}>
                lyrics
              </span>
          </TextButton>
          <TextButton>
            <span className={`material-symbols-outlined`}>queue_music</span>
          </TextButton>
          <div className="volume flex items-center">
            <TextButton>
              <span className="material-symbols-outlined">volume_up</span>
            </TextButton>
            {/* <div className="volume-slider"> */}
            <input className="max-w-28 w-full" aria-label="input" type="range" value={time} min={0} max={300} onInput={(e) => setTime(Number(e.target.value))}/>
            {/* </div> */}
          </div>
          {/* <Link></Link> */}
        </div>
      </div>
      </body>
    </html>
  );
}
