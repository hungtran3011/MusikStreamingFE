'use client';

import { useState, useEffect } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface UserMenuProps {
  onLogout: () => void;
}

export default function UserMenu({ onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const role = getCookie('role');
    const isManagerPath = pathname?.startsWith('/manager');
    setIsManager(
      (role === 'Artist Manager' || role === 'Artist%20Manager') && isManagerPath
    );
  }, [pathname]);

  const handleLogout = () => {
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    deleteCookie('role');
    onLogout();
    window.location.href = '/';
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-[--md-sys-color-outline]"
        title="Open user menu"
        aria-label="Open user menu"
      >
        <Image
          src="/assets/default-avatar.png"
          alt="User avatar"
          width={40}
          height={40}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-[--md-sys-color-surface] ring-1 ring-black ring-opacity-5 px-2">
          <div className="py-1 rounded-xl" role="menu">
            {isManager && (
              <Link
                href="/manager"
                className="px-4 py-2 text-sm hover:bg-[--md-sys-color-surface-variant] rounded-md flex items-center gap-2"
                role="menuitem"
              >
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-sm font-medium">Manager Dashboard</span>
              </Link>
            )}
            <Link
              href={isManager ? "/manager/settings" : "/settings"}
              className="px-4 py-2 text-sm hover:bg-[--md-sys-color-surface-variant] rounded-md flex items-center gap-2"
              role="menuitem"
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-medium">Cài đặt</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-[--md-sys-color-error] hover:bg-[--md-sys-color-surface-variant] rounded-md flex items-center gap-2"
              role="menuitem"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}