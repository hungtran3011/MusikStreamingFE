'use client';

import React from 'react';
import IconSmallButton from '../buttons/icon-small-button';
import FilledButton from '@/app/components/buttons/filled-button';
import SearchBox from '@/app/components/inputs/search-box';
import { useRouter, usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
// import ToggleIconButton from './toggle-icon-button';

export default function NavBar() {
  const route = useRouter();
  const pathname = usePathname();
  const searchFocus = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (pathname == "/search" && searchFocus.current && window.innerWidth > 768) {
      searchFocus.current.focus();
    }
  }, [pathname]);

  return (
    <div className="nav-bar flex flex-grow-0 pl-4 md:pl-0 pt-3 items-center justify-between w-full top-0 max-h-24 sticky bg-inherit z-[1000]" autoFocus={true}>
      <div className='flex mr-3'>
        <div className="nav-bar-button-container hidden md:flex md:p-3 md:gap-3 md:items-center">
          <IconSmallButton className="app-bar-button" onClick={() => {
            route.back();
          }}>
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </IconSmallButton>
          <IconSmallButton onClick={
            () => {
              route.forward();
            }
          }>
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </IconSmallButton>
        </div>
        <div className="nav-bar-title-container flex items-center gap-3">
          <Image width={64} height={64} src={"/assets/rounded-logo.png"} priority alt="logo"
          />
          <h1 className="hidden lg:block nav-bar-title text-lg font-bold">
            {"MusikStreaming"}
          </h1>
        </div>
      </div>

      <div className="search-and-browse-container flex justify-center gap-4 flex-grow">
        <div className="search-and-browse-inner flex-grow flex items-center sm:justify-center">
          {/* <ToggleIconButton>
              <span className="material-symbols-outlined">
                browse
              </span>
            </ToggleIconButton> */}
          <SearchBox className='hidden md:flex' placeholder="Search" ref={searchFocus} />
        </div>
      </div>
      <div className="nav-bar-button-container flex p-3 gap-3 items-center">
        <FilledButton onClick={() => {
          route.push("/login")
        }}>
          {"Đăng nhập/Đăng ký"}
        </FilledButton>
      </div>
    </div>
  )
}