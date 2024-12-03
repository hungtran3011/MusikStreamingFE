// app/home/home-client.tsx
"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Suspense, lazy } from "react";
import Loading from "./loading";

const Artists = lazy(() => import("@/app/components/api-fetch-container/all-artists"));
const Songs = lazy(() => import("@/app/components/api-fetch-container/all-songs"));
const Albums = lazy(() => import("@/app/components/api-fetch-container/all-albums"));

export default function HomeContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = getCookie("access_token");
      setIsLoggedIn(!!accessToken);
    };

    // Check immediately
    checkAuth();
    
    // Check when the component mounts and when storage changes
    const interval = setInterval(checkAuth, 1000); // Check every second
    window.addEventListener('storage', checkAuth);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  if (isLoggedIn) {
    return (
      <div className="home w-full flex flex-col gap-8">
        <h1 className="text-lg font-bold">Welcome back!</h1>
        <div className="card-scroll flex flex-col overflow-x-hidden gap-4">
          <h2 className="text-lg font-bold">Your Recent Plays</h2>
          <Suspense fallback={<Loading />}>
            <Songs />
          </Suspense>
        </div>
        <div className="card-scroll flex flex-col overflow-x-hidden gap-4">
          <h2 className="text-lg font-bold">Recommended for You</h2>
          <Suspense fallback={<Loading />}>
            <Albums />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <div className="home w-full flex flex-col gap-8">
      <div className="card-scroll flex flex-col overflow-hidden gap-4">
        <h1 className="text-lg font-bold">Nghệ sĩ nổi bật</h1>
        <Suspense fallback={<Loading />}>
          <Artists />
        </Suspense>
      </div>
      <div className="card-scroll flex flex-col overflow-x-hidden gap-4">
        <h1 className="text-lg font-bold">Bài hát đang thịnh hành</h1>
        <Suspense fallback={<Loading />}>
          <Songs />
        </Suspense>
      </div>
      <div className="card-scroll flex flex-col overflow-x-hidden gap-4">
        <h1 className="text-lg font-bold">Album mới</h1>
        <Suspense fallback={<Loading />}>
          <Albums />
        </Suspense>
      </div>
    </div>
  );
}
