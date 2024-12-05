'use client'
import { useState } from "react"
/**
 * IconSmallButton component
 * 
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Optional class name for the button
 * @param {Function} [props.onClick] - Optional click handler for the button
 * @param {React.ReactNode} props.children - Child elements to be rendered inside the button
 * @returns {JSX.Element} The rendered TextButton component
 */
export default function ToggleIconButtonDotted(props) {
  const [active, setActive] = useState(false)
  return(
      <div className="toggle-icon-btn-dotted" role='button' onClick={() => {
        setActive(!active)
        props.onClick();
      }}>
          <div className={`state-layer relative h-8 w-8 md:p-3 md:h-12 md:w-12 rounded-full m-auto items-center justify-center ${props.className}`}>
              <md-ripple></md-ripple>
              <div className="flex w-fit gap-3">
                <span className={`material-symbols-outlined${active ? "-filled" : ""}`}>
                  {props.children}
                </span>
              </div>
              <div className={`dot ${active ? "m-auto bg-white rounded-full w-1 h-1" : ""}`}>
              
              </div>
          </div>
      </div>
  )
}