import {redirect} from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Settings(){
    const cookieStore = await cookies();
    if (!cookieStore.has("accessToken")) {
        redirect("/login");
    }
    return (
        <h1>Settings</h1>
    )
}