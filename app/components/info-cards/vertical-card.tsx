'use client'

import Image from 'next/image';
import TextButton from '../buttons/text-button';
import './cards.css'
import 'material-symbols'

export default function VerticalCard() {
  return (
    // <div className="p-3 pb-3 bg-[#46483c] rounded-lg justify-start items-start gap-3 inline-flex">
    //   <div className="grow shrink basis-0 flex-col justify-start items-center gap-3 inline-flex">
    //     <div className="self-stretch h-[140px] justify-center items-center inline-flex">
    //       <div className="h-[140px] justify-center items-center flex">
    //         <div className="min-w-[140px] w-fit h-[140px] justify-center items-center inline-flex">
    //           <Image className="w-[140px] h-[140px]" src="/favicon.ico" alt="Placeholder image" width={140} height={140} />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="self-stretch h-[52px] px-1 flex-col justify-start items-start gap-1 flex">
    //       <div className="self-stretch text-[--md-sys-color-on-background] text-sm font-semibold  leading-none tracking-wide">Lorem ipsum</div>
    //       <div className="self-stretch text-[--md-sys-color-outline] text-xs font-normal  leading-none tracking-wide">Lorem ipsum dolor sit amet</div>
    //     </div>
    //     <div className="play-button-container">
    //       <div className="play-button w-12 ">
    //         <TextButton className="">
    //           <span className="material-symbols-outlined icon-filled">play_arrow</span>
    //         </TextButton>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="vertical-card song-card rounded-lg bg-[--md-sys-color-outline-variant] flex flex-col w-[200px]">
      <div className="cover-img self-stretch flex justify-stretch h-full w-[200px]">
        <Image
          className="self-stretch rounded-t-lg"
          src={"https://upload.wikimedia.org/wikipedia/en/4/4f/Lana_Del_Rey_-_Did_You_Know_That_There%27s_a_Tunnel_Under_Ocean_Blvd.png"}
          alt={"BLVD"}
          width={200}
          height={200}
        >
        </Image>
      </div>
      <div className="title text-ellipsis flex">
        <p className="line-clamp-2">{"Did you know that there's a tunnel under Ocean Blvd"}</p>
      </div>
      <div className="play-button-container w-full flex items-end justify-end">
        <div className="play-button w-12 ">
          <TextButton className="">
            <span className="material-symbols-outlined icon-filled">play_arrow</span>
          </TextButton>
        </div>
      </div>
    </div>
  )
}