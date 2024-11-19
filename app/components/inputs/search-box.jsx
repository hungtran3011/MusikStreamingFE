import 'material-symbols';
import TextButton from '../buttons/text-button';

/**
 * SearchBox component renders a search input box with a search button.
 * 
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - Optional additional class names for the search box.
 * @param {string} [props.placeholder] - Optional placeholder text for the input.
 * @param {string} [props.text] - Optional initial text value for the input.
 * @returns {JSX.Element} The rendered search box component.
 */
export default function SearchBox(props) {
    return(
        <div className={`grow self-stretch justify-stretch flex search-box rounded-full h-14 max-w-[720px] bg-[--md-sys-color-surface-container] text-[--md-sys-color-on-surface-container] ${props.className}`} role='search'>
            <div className="state-layer self-stretch relative rounded-full pl-6 pr-1 gap-1 flex items-center w-full">
                <md-ripple></md-ripple>
                <input className='border-1 outline-none bg-transparent self-stretch flex-grow' type='text' placeholder={props.placeholder} value={props.text} autoFocus={true}/>
                <TextButton>
                    <span className='material-symbols-outlined'>search</span>
                </TextButton>  
            </div>
        </div>
    )
}