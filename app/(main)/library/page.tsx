'use client';

import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { useEffect } from "react";

export default function Library(){
    const router = useRouter();

    useEffect(() => {
    const accessToken = getCookie("access_token");
    if (!accessToken) {
        router.replace("/login");   
    }
    }, [router]);

    return (
        <h1>Library</h1>
    );
}