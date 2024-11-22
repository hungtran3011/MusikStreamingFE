/**
 * RootLayout component for the MusikStreaming app.
 * This component sets up the main layout structure including the navigation bar,
 * navigation rail, content area, and the song playing section.
 */

import { Inter } from "next/font/google";
import "../globals.css";
// import "material-symbols/outlined.css";
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

const bottomItems = {
  'home': {
    text: 'Trang chủ',
    icon: 'home',
    href: '/',
    type: NavItemType.DEFAULT
  },
  
  'explore': {
    text: 'Khám phá',
    icon: 'search',
    href: '/search',
    type: NavItemType.DEFAULT
  },
  'library_music': {
    text: 'Thư viện',
    icon: 'library_music',
    href: '/library',
    type: NavItemType.DEFAULT
  },
  'settings': {
    text: 'Cài đặt',
    icon: 'settings',
    href: '/settings',
    type: NavItemType.DEFAULT
  },
};

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  style: ['normal', 'italic'],
  display: 'swap'
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
      <head>  
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
      </head>
      <body className={`${inter} antialiased`}>
        <NavBar />
        <div className="content flex p-4 pr-1 gap-4 flex-grow flex-1 justify-stretch">
          <NavRail items={items} />
          <div className="center-scroll flex-grow self-stretch overflow-hidden rounded-xl">
            <div className="center-scroll-inner min-h-[100vh] flex items-start h-full bg-[--md-sys-color-surface-container-low] rounded-l-xl px-4 py-6">
              {children}
            </div>
          </div>
        </div>
        <SongControl />
        <BottomNavBar items={bottomItems} />
      </body>
    </html>
  );
}
