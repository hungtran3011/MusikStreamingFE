/**
 * RootLayout component for the MusikStreaming app.
 * This component sets up the main layout structure including the navigation bar,
 * navigation rail, content area, and the song playing section.
 */

// 'use client'

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
import SongControl from "../components/audio/song-control";
import { Suspense } from "react";

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
  subsets: ["latin", "vietnamese"],
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

  // function handleLyricsToggle() {
  //   setLyricsToggled(!lyricsToggled);
  // }

  // function handleTime(e: React.ChangeEvent<HTMLInputElement>) {
  //   setTime(Number(e.target.value));
  // }

  // const [lyricsToggled, setLyricsToggled] = useState(false);
  // const [time, setTime] = useState(0);
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
            {/* <Suspense> */}
              {children}
            {/* </Suspense> */}
            
            </div>
        </div>
      </div>
      <SongControl></SongControl>
      </body>
    </html>
  );
}
