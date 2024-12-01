'use client';
import BrowseCard from '@/app/app-components/browse/browse-card';
import ScalableSearchBox from '@/app/app-components/inputs/scalable-search-box';
import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useScreenWidth from '@/app/hooks/useScreenWidth';

export default function SearchPage() {
    // categories
    const pathname = usePathname();
    // Mỗi khi chuyển sang trang search, focus vào ô search
    const searchFocus = useRef<HTMLInputElement>(null);
    const screenWidth = useScreenWidth();
    useEffect(() => {
        if (pathname == "/search" && searchFocus.current && screenWidth > 768) {
        searchFocus.current.focus();
        }
    }, [pathname, screenWidth]);
    return (
       <div className='flex flex-col w-full'>
        <ScalableSearchBox 
            className='md:hidden bg-[--md-sys-color-surface] text-[--md-sys-color-on-surface]'
            placeholder="Search"
            autoFocus={true} 
            ref={searchFocus}
        />
        <BrowseCard 
            title="Pop" 
            image={{
                src: "/assets/libs.png",
                width: 160,
                alt: "Browse"
            }
            }
            bgColour='#FC94AF'
            textColour='#000000'
            url="/"/>
       </div>
    );
}