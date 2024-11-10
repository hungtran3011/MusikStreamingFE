// 'use client';

// import 'material-symbols';
// import '@material/web/ripple/ripple';
// import Link from 'next/link';

// import { BottomNavItemData } from '../model/bottom-nav-item-data';

// export default function BottomNavBar(
//     props: {
//         className?: string,
//         items: {
//             [key: string] : BottomNavItemData}
//     }
// ) {
//     return (
//         <div className={`${props.className} bottom-nav-bar flex items-center justify-between`}>
//             {Object.keys(props.items).map((item, index) => {
//                 return (
//                     <Link key={item} href
//                     ={props.items[item].href}>
//                         <div className={`bottom-nav-item flex flex-col items-center justify-center`}>
//                             <span className={`material-symbols-outlined`}>{item}</span>
//                             <p>{props.items[item].text}</p>
//                         </div>
//                     </Link>
//                 );
//             })}
//         </div>
//     );
// }