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
        <div className={`sm:grow sm:self-stretch sm:justify-stretch flex search-box rounded-full h-fit sm:h-14 sm:max-w-[720px] bg-[--md-sys-color-surface-container] text-[--md-sys-color-on-surface-container] ${props.className}`} role='search'>
            <div className="state-layer sm:self-stretch relative rounded-full sm:pl-6 sm:pr-1 sm:gap-1 flex items-center sm:w-full">
                <md-ripple></md-ripple>
                <input className='border-1 outline-none bg-transparent sm:self-stretch flex-grow hidden sm:flex' type='text' placeholder={props.placeholder} value={props.text} autoFocus={true}/>
                <TextButton>
                    <span className='material-symbols-outlined'>search</span>
                </TextButton>  
            </div>
        </div>
    )
}