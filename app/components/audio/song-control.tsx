import Image from 'next/image';
import TextButton from '../buttons/text-button';

export default function SongControl() {
    return (
        <div className="song-playing z-[1000] bg-[--md-sys-color-inverse-on-surface] p-4 gap-4 flex flex-grow-0 items-center justify-center">
        <div className="song-title flex items-center gap-2 w-1/6">
          <Image src={"/favicon.ico"} alt="song-playing" width={64} height={64} />
          <div className="song-title-info">
            <p className="song-title-text">Song title</p>
            <p className="song-artist">Artist</p>
          </div>
          <span className="material-symbols-outlined">favorite</span>
        </div>
        {/* <audio src="" controls className=""></audio> */}
        <div className="song-controls-container flex-col flex-grow">
          <div className="song-controls flex items-center justify-center gap-4">
            <TextButton>
              <span className="material-symbols-outlined">skip_previous</span>
            </TextButton>
            <TextButton>
              <span className="material-symbols-outlined">play_arrow</span>
            </TextButton>
            <TextButton>
              <span className="material-symbols-outlined">skip_next</span>
            </TextButton>
          </div>
          <div className="song-progress flex items-center gap-4">
            <p>0:00</p>
            <div className="song-progress-bar flex-grow bg-[--md-sys-color-on-surface] h-1 rounded-full overflow-clip">
              <div className="song-progress-bar-inner bg-[--md-sys-color-primary] h-full rounded-full"></div>
            </div>
            <p>3:00</p>
          </div>
        </div>
        <div className="right-controls w-1/6 flex">
          <TextButton>
            <span className="material-symbols-outlined">volume_up</span>
          </TextButton>
          <TextButton>
            <span className="material-symbols-outlined">queue_music</span>
          </TextButton>
        </div>
      </div>
    )
}