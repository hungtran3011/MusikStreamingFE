// app/home/home-client.tsx
"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Suspense } from "react";
import Loading from "./loading";

import Artists from "@/app/components/api-fetch-container/all-artists";
import Songs from "@/app/components/api-fetch-container/all-songs";
import Albums from "@/app/components/api-fetch-container/all-albums";

export default function Content() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = getCookie("access_token");
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsLoggedIn(!!accessToken);
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    
    const interval = setInterval(checkAuth, 5000);
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', checkAuth);
    }
    
    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', checkAuth);
      }
    };
  }, []);

  console.log("isLoading:", isLoading);
  console.log("isLoggedIn:", isLoggedIn);

  if (isLoading) {
    return <Loading />;
  }

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
