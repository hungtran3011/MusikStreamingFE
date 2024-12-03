'use client'

import { useState, useEffect } from 'react';

const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState( typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined')
                setScreenWidth(window.innerWidth);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);

            // Clean up event listener on component unmount
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return screenWidth;
};

export default useScreenWidth;
