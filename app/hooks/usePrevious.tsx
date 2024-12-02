'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const usePreviousRoute = () => {
  const asPath = useRouter();
  const ref = useRef(asPath);

  useEffect(() => {
    ref.current = asPath;
    console.log('Previous route:', ref.current);
  }, [asPath]);

  return ref.current;
};

export default usePreviousRoute;
