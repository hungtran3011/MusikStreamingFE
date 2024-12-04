'use client';

import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";

export default function Library(){
    const router = useRouter();
    const accessToken = getCookie("access_token");
    if (!accessToken) {
        router.replace("/login");   
    }
    return (
        <h1>Library</h1>
    )
}