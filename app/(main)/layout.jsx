/**
 * RootLayout component for the MusikStreaming app.
 * This component sets up the main layout structure including the navigation bar,
 * navigation rail, content area, and the song playing section.
 */

import { Inter } from "next/font/google";
import "../globals.css";
import "material-symbols/outlined.css";
import NavBar from "../components/navs/nav-bar";
import NavRail from "@/app/components/navs/nav-rail";
import { NavItemType } from "../model/nav-item-type";
import SongControl from "../components/audio/song-control";
import BottomNavBar from "../components/navs/bottom-nav-bar";

/**
 * Navigation items configuration.
 */
const items = {
  'home': {
    text: 'Home',
    badgevalue: 0,
    href: '/',
    type: NavItemType.DEFAULT
  },
  'library_music': {
    text: 'Your library',
    badgevalue: 0,
    href: '/library',
    type: NavItemType.DEFAULT
  },
  'favorite': {
    text: 'Favorites',
    badgevalue: 0,
    href: '/favorites',
    type: NavItemType.DEFAULT
  },
  'settings': {
    text: 'Settings',
    badgevalue: 0,
    href: '/settings',
    type: NavItemType.DEFAULT
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
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter} ${inter} antialiased`}>
        <NavBar />
        <div className="content flex p-4 pr-1 gap-4 flex-grow flex-1 justify-stretch">
          <NavRail items={items} />
          <div className="center-scroll overflow-hidden flex-grow">
            <div className="center-scroll-inner flex items-start h-full bg-[--md-sys-color-surface-container-low] rounded-xl px-4 py-6">
              {children}
            </div>
          </div>
        </div>
        <SongControl />
        <BottomNavBar items={items} />
      </body>
    </html>
  );
}
