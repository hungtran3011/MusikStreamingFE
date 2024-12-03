'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
/**
 * PlayButton component
 * 
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Optional class name for the button
 * @param {Function} [props.onClick] - Optional click handler for the button
 * @param {bool} [props.disabled] - Optional flag to disable the button
 * @returns {JSX.Element} The rendered TextButton component
 */
export default function PlayButton({
  className,
  onClick,
  ...props
}) {
  const [playing, setPlaying] = useState(false);
  return(
      // <IconSmallButton className="md:bg-[--md-sys-color-primary] md:text-[--md-sys-color-on-primary]" onClick={() => {
      //   props.onClick();
      //   setPlaying(!playing);
      // }}>
      //     <span className="material-symbols-outlined-filled">
      //       {playing ? "pause" : "play_arrow"}
      //     </span>
      // </IconSmallButton>
      <button className="play-btn" role='button' onClick={() => {
        setPlaying(!playing);
        onClick()
      }} {...props}>
          <div className={twMerge("state-layer rounded-full relative flex items-center justify-center", className)}>
              <md-ripple className={`${props.disabled ? "hidden" : ""}`}></md-ripple>
              <div className="flex w-fit gap-3 material-symbols-outlined-filled">
              {playing ? "pause" : "play_arrow"}
              </div>
          </div>
      </button>
  )
}