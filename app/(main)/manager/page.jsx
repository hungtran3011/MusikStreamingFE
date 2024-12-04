'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ManagerDashboard() {
    const router = useRouter()
    const [stats, setStats] = useState({
        totalSongs: 0,
        totalAlbums: 0,
        totalPlays: 0
    });

    const handleExitManager = () => {
        setTimeout(() => {
            router.push('/');
        }, 100);
    };

    useEffect(() => {
        // TODO: Fetch actual stats from your API
        setStats({
            totalSongs: 42,
            totalAlbums: 5,
            totalPlays: 10000
        });
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Artist Dashboard</h1>
                <button 
                    onClick={handleExitManager}
                    className="text-[--md-sys-color-primary] hover:underline"
                >
                    Exit Manager Mode
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[--md-sys-color-surface-container]">
                    <h3 className="text-lg font-semibold mb-2">Total Songs</h3>
                    <p className="text-2xl">{stats.totalSongs}</p>
                </div>
                <div className="p-4 rounded-lg bg-[--md-sys-color-surface-container]">
                    <h3 className="text-lg font-semibold mb-2">Total Albums</h3>
                    <p className="text-2xl">{stats.totalAlbums}</p>
                </div>
                <div className="p-4 rounded-lg bg-[--md-sys-color-surface-container]">
                    <h3 className="text-lg font-semibold mb-2">Total Plays</h3>
                    <p className="text-2xl">{stats.totalPlays}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-[--md-sys-color-surface-container]">
                    <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                    {/* Add recent activity content */}
                </div>
                <div className="p-4 rounded-lg bg-[--md-sys-color-surface-container]">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="flex flex-col gap-2">
                        <Link 
                            href="/manager/discography"
                            className="p-2 rounded hover:bg-[--md-sys-color-surface-container-high] transition-colors"
                        >
                            Manage Discography
                        </Link>
                        <Link 
                            href="/manager/settings"
                            className="p-2 rounded hover:bg-[--md-sys-color-surface-container-high] transition-colors"
                        >
                            Account Settings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
