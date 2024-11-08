'use client'

// import Button from "@mui/material/Button";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/outlined-button"
import "material-symbols";
// import Button from "./components/button";
import NavRail from "./components/nav-rail";
import { NavItemData } from "./model/nav-item-data";
import { MdFilledButton } from "@material/web/button/filled-button.d.ts";
import { MdTextButton } from "@material/web/button/text-button";
import TextButton from "./components/text-button";

const items: { [key: string]: NavItemData } = {
  'home': {
      text: 'Home',
      badgevalue: 0,
      onClick: () => {
          // setSelected(0);
          console.log('Home')
      },
      href: '#',
      type: 0
  },
  'library_music': {
      text: 'Your library',
      badgevalue: 0,
      onClick: () => {
          // setSelected(1);
          console.log('Your library')
      },
      href: '#',
      type: 0
  },
  'favorite': {
      text: 'Favorites',
      badgevalue: 0,
      href: '#',
      type: 0
  },
  'settings': {
      text: 'Settings',
      badgevalue: 0,
      href: '#',
      type: 0
  },
  // 'song1':{
  //   text: "Did you know",
  //   href: "#",
  //   img: {
  //     src: "https://en.wikipedia.org/wiki/Did_You_Know_That_There%27s_a_Tunnel_Under_Ocean_Blvd#/media/File:Lana_Del_Rey_-_Did_You_Know_That_There's_a_Tunnel_Under_Ocean_Blvd.png",
  //     width: 16,
  //   },
  //   type: 1
  // }
};

export default function Home() {
  return (
    <div className="home-page flex-col pb-4 h-screen items-start justify-stretch">
      <div className="app-bar flex pt-3">
        <div className="nav-bar-button-container flex p-3 gap-3">
          <TextButton className="app-bar-button">
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </TextButton>
          <TextButton>
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </TextButton>
        </div>
        <div className="search-and-browse-container flex items-center">
          <TextButton>
            <span className="material-symbols-outlined">
              browse
            </span>
            <div className="search-box">
              
            </div>
          </TextButton>
        </div>
      </div>
      <div className="content flex p-4 gap-4 self-stretch">
        <NavRail items={items} selected={0} />
        <div className="center-scroll flex overflow-y-scroll">
          <md-filled-button className={"body-button"}>Click me</md-filled-button>
        </div>
      </div>
    </div>
  );
}
