import React from 'react';
import Image from 'next/image';
import { ButtonBase } from '@mui/material';

// export default function Button({
//     onClick,
//     children,
//     disabled,
//     icon=false,
//     iconSrc="",
//     state="filled",
//     }) {
//     let fontColor = "text-[--md-sys-color-on-primary]";
//     let bgColor = "bg-[--md-sys-color-primary]";
//     let borderStyle = "border-none";
//     let hoverStyle = "hover:drop-shadow-[0_1px_6px_5px_rgba(0,0,0)]";
//     switch (state) {
//         case "filled":
//             break;
//         case "outlined":
//             fontColor = "text-[--md-sys-color-on-primary-container]";
//             bgColor = "bg-[--md-sys-color-primary-container]";
//             borderStyle = "border-2 border-[--md-sys-color-primary]";
//             break;
//         case "text":
//             fontColor = "text-[--md-sys-color-primary]";
//             bgColor = "bg-transparent";
//             break;
//     }
//     return (
//     <div className={`h-10 ${bgColor} rounded-full flex-col justify-center items-center gap-2 inline-flex ${borderStyle
//     } ${hoverStyle}`} role='button' onClick={onClick} disabled={disabled}>
//         <div className="self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex">
//             {(icon && iconSrc!=="") ? <div className="w-4 h-4 justify-center items-center flex">
//                 <Image className="w-4 h-4" src={iconSrc} alt={children}></Image>
//             </div>
//             : null}
//             <div className={`text-center ${fontColor} text-md font-medium font-['Inter'] leading-tight tracking-tight`}>
//                 {children}
//             </div>
//         </div>
//     </div>
//     );  
// }