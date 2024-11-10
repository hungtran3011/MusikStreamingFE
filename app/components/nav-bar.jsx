import React from 'react';
import TextButton from './text-button';
import FilledButton from './button';
import SearchBox from './search-box';
// import ToggleIconButton from './toggle-icon-button';

export default function NavBar() {
    return (
        <div className="nav-bar flex flex-grow-0 pl-4 md:pl-0 pt-3 items-center justify-between w-full top-0 max-h-24 sticky bg-inherit z-[1000]" autoFocus={true}>
        <div className="nav-bar-button-container hidden md:flex md:p-3 md:gap-3 md:items-center">
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
        <div className="search-and-browse-container flex justify-center gap-4 flex-grow">
          <div className="search-and-browse-inner flex-grow flex items-center justify-center">
            {/* <ToggleIconButton>
              <span className="material-symbols-outlined">
                browse
              </span>
            </ToggleIconButton> */}
            <SearchBox placeholder="Search" className="flex-grow"/>
          </div>
        </div>
        <div className="nav-bar-button-container flex p-3 gap-3 items-center">
          <FilledButton showIcon={false}>
            Đăng nhập/Đăng ký
          </FilledButton>
        </div>
      </div>
    )
}