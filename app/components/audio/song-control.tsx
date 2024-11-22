import Image from 'next/image';
import TextButton from '../buttons/text-button';
import PassiveProgress from './passive-progress';

export default function SongControl() {
  return (
    <div className='song-playing z-[1000] bg-[--md-sys-color-inverse-on-surface] flex-col'>
      <div className="p-4 gap-4 flex flex-wrap items-center justify-between">
        <div className="song-title flex items-center gap-2 w-1/3 md:w-1/6">
          <Image src={"/favicon.ico"} alt="song-playing" width={64} height={64} />
          <div className="song-title-info">
            <p className="song-title-text">Song title</p>
            <p className="song-artist">Artist</p>
          </div>
          <span className="material-symbols-outlined">favorite</span>
        </div>
        <div className="song-controls-container flex-col w-1/3">
          <div className="song-controls flex items-center justify-end md:justify-center gap-4">
            <TextButton>
              <span className="material-symbols-outlined-filled">skip_previous</span>
            </TextButton>
            <TextButton>
              <span className="material-symbols-outlined-filled">play_arrow</span>
            </TextButton>
            <TextButton>
              <span className="material-symbols-outlined-filled">skip_next</span>
            </TextButton>
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
          <TextButton>
            <span className={`material-symbols-outlined {lyricsToggled ? "icon-filled" : "icon"}`}>
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
            <input className="max-w-28 w-full" aria-label="input" type="range" value={0} min={0} max={300}/>
            {/* </div> */}
          </div>
        </div>
      </div>
      <PassiveProgress className='md:hidden'/>
    </div>
  )
}