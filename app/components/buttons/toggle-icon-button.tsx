'use client';

import { useState } from 'react';
import IconSmallButton from './icon-small-button';

interface ToggleIconButtonProps {
  children: React.ReactNode;
  defaultState?: boolean;
  onChange?: (state: boolean) => void;
}

export default function ToggleIconButton({ children, defaultState = false, onChange }: ToggleIconButtonProps) {
  const [isActive, setIsActive] = useState(defaultState);

  const handleClick = () => {
    setIsActive(!isActive);
    onChange?.(!isActive);
  };

  return (
    <IconSmallButton onClick={handleClick} className={`${isActive ? 'text-[--md-sys-color-primary]' : ''} flex items-center justify-center`}>
      {children}
    </IconSmallButton>
  );
} 