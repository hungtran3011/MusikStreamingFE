import Image from 'next/image';
// import TextButton from '../buttons/text-button';
import IconSmallButton from '@/app/components/buttons/icon-small-button';
import PassiveProgress from '@/app/components/audio/passive-progress';
import PlayButton from '@/app/components/buttons/play-button-main';
import ToggleIconButtonDotted from '@/app/components/buttons/toggle-icon-button-dotted';

export default function SongControl() {
  return (
    <div className='song-playing z-[1000] bg-[--md-sys-color-inverse-on-surface] flex-col'>
      <div className="p-4 gap-4 flex flex-wrap items-center justify-between">
        <div className="song-title flex items-center gap-2 w-1/3 md:w-1/6">
          <Image src={"/assets/placeholder.jpg"} alt="song-playing" width={64} height={64} />
          <div className="song-title-info">
            <p className="song-title-text">Song title</p>
            <p className="song-artist">Artist</p>
          </div>
          <span className="material-symbols-outlined hidden lg:block">favorite</span>
        </div>
        <div className="song-controls-container flex-col w-1/3">
          <div className="song-controls flex items-center justify-end md:justify-center gap-4">
            <IconSmallButton>
              <span className="material-symbols-outlined-filled">skip_previous</span>
            </IconSmallButton>
            <PlayButton className="h-8 w-8 md:p-3 md:h-12 md:w-12 ${className} md:bg-[--md-sys-color-primary] md:text-[--md-sys-color-on-primary]" disabled={true}/>
            <IconSmallButton disabled={true}>
              <span className="material-symbols-outlined-filled">skip_next</span>
            </IconSmallButton>
          </div>
          <div className="song-progress md:flex items-center gap-4 hidden">
            {/* <p>{time}</p> */}
            {/* <div className="song-progress-bar flex-grow bg-[--md-sys-color-on-surface] h-1 rounded-full overflow-clip">
              <div className="song-progress-bar-inner bg-[--md-sys-color-primary] h-full rounded-full"></div>
            </div> */}
            <input type="range" aria-label="input" className="w-full" />
            <p>3:00</p>
          </div>
        </div>
        <div className="right-controls w-1/6 items-end justify-end hidden md:flex">
          <ToggleIconButtonDotted>
              lyrics
          </ToggleIconButtonDotted>
          <ToggleIconButtonDotted>
            <span className={`material-symbols-outlined`}>queue_music</span>
          </ToggleIconButtonDotted>
          <div className="volume flex items-center">
            <IconSmallButton>
              <span className="material-symbols-outlined">volume_up</span>
            </IconSmallButton>
            {/* <div className="volume-slider"> */}
            <input className="max-w-28 w-full" aria-label="input" type="range" value={0} min={0} max={300}/>
            {/* </div> */}
          </div>
        </div>
      </div>
      <PassiveProgress className='md:hidden'/>
    </div>
  )
}