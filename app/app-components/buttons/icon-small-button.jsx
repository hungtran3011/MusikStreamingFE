'use client';
/**
 * IconSmallButton component
 * 
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Optional class name for the button
 * @param {Function} [props.onClick] - Optional click handler for the button
 * @param {React.ReactNode} props.children - Child elements to be rendered inside the button
 * @returns {JSX.Element} The rendered TextButton component
 */
export default function IconSmallButton(props) {
  return(
      <div className="text-btn" role='button' onClick={props.onClick}>
          <div className={`state-layer relative h-8 w-8 md:p-3 md:h-12 md:w-12 rounded-full flex items-center justify-center ${props.className}`}>
              <md-ripple></md-ripple>
              <div className="flex w-fit gap-3">
              {props.children}
              </div>
          </div>
      </div>
  )
}