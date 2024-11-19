/**
 * ToggleIconButton component renders a button with optional icon and selected state.
 * 
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - Additional class names for the button.
 * @param {Function} [props.onClick] - Click event handler.
 * @param {string} [props.icon] - Icon name to be displayed.
 * @param {boolean} [props.showIcon] - Flag to show or hide the icon.
 * @param {string} [props.children] - Button label.
 * @param {boolean} [props.selected] - Flag to indicate if the button is selected.
 */
export default function ToggleIconButton(props) {
    let showIcon = props.showIcon;
    if (props.icon === undefined || props.icon === '') {
        showIcon = false;
    } else if (props.showIcon === undefined) {
        showIcon = false;
    }
    if (props.selected === undefined) {
        props.selected = false;
    }
    return (
        <div className={`toggle-btn flex items-center focus:ring ${props.selected ? 'selected' : ''}`} role='button' onClick={props.onClick}>
            <div className={`state-layer relative p-4 ${showIcon ? "" : "pr-6"} gap-3 rounded-full flex items-center bg-[--md-sys-color-primary] text-[--md-sys-color-on-primary]`}>
                <md-ripple className="ripple"></md-ripple>
                <span className={`material-symbols-outlined ${showIcon ? "block" : "none"}`}>{props.icon}</span>
                <p className='text-center font-medium'>{props.children}</p>
            </div>
        </div>
    );
}