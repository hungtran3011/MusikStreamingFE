'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import TabButton from '@/app/components/buttons/tab-button';

export default function Settings() {
    const router = useRouter();
    useEffect(() => {
        const accessToken = getCookie("access_token");
        if (!accessToken) {
            router.replace("/login");
        }
    }, [router]);

    const [activeTab, setActiveTab] = useState('general');

    return (
        <div>
            <h1 className="text-3xl font-bold mb-5">Settings</h1>
            <div className="tabs flex justify-around mb-5 relative">
                <TabButton label="General" isActive={activeTab === 'general'} onClick={() => setActiveTab('general')} />
                <TabButton label="Account" isActive={activeTab === 'account'} onClick={() => setActiveTab('account')} />
                <TabButton label="Privacy" isActive={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')} />
                <div 
                    className={`absolute bottom-0 h-0.5 bg-[--md-sys-color-primary] transition-all duration-300 ease-in-out w-1/3
                        ${activeTab === 'general' ? 'left-0' : activeTab === 'account' ? 'left-1/3' : 'left-2/3'}`}
                />
            </div>
            <div className="tab-content">
                {activeTab === 'general' && <div>General Settings Content</div>}
                {activeTab === 'account' && <div>Account Settings Content</div>}
                {activeTab === 'privacy' && <div>Privacy Settings Content</div>}
            </div>
        </div>
    );
}