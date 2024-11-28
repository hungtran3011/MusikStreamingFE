/**
 * TextButton component
 * 
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Optional class name for the button
 * @param {Function} [props.onClick] - Optional click handler for the button
 * @param {React.ReactNode} props.children - Child elements to be rendered inside the button
 * @returns {JSX.Element} The rendered TextButton component
 */
export default function TextButton(props) {
    return(
        <div className="text-btn" role='button' onClick={props.onClick}>
            <div className="state-layer relative h-12 p-3 rounded-full flex items-center">
                <md-ripple></md-ripple>
                <div className="flex w-fit gap-3">
                {props.children}
                </div>
            </div>
        </div>
    )
}