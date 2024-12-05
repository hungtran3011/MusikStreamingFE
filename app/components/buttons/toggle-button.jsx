'use client'

import { useState } from 'react';

/**
 * ToggleIconButton component - A button that toggles between filled and outlined icon states
 * 
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Optional class name for styling the button
 * @param {Function} [props.onClick] - Optional click handler called when button is clicked
 * @param {React.ReactNode} props.children - The icon name from Material Symbols font to display
 * @returns {JSX.Element} The rendered ToggleIconButton component
 * 
 * @example
 * <ToggleIconButton onClick={() => console.log('Toggled!')}>
 *   favorite
 * </ToggleIconButton>
 */

export default function ToggleIconButton(props) {
  const [active, setActive] = useState(false)

  return (
    <div className="toggle-icon-btn" role="button" onClick={() => {
      setActive(!active)
      if (props.onClick) {
        props.onClick()
      }
    }}>
      <div className={`state-layer relative h-8 w-8 md:h-12 md:w-12 rounded-full m-auto flex items-center justify-center ${props.className || ''}`}>
        <md-ripple></md-ripple>
        <span className={`material-symbols-outlined${active ? '-filled' : ''} ${active ? 'text-[--md-sys-color-primary]' : ''}`}>
          {props.children}
        </span>
      </div>
    </div>
  )
}