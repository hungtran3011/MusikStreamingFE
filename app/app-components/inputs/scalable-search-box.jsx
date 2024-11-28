'use client';
import TextButton from '@/app/app-components/buttons/text-button';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

/**
 * ScalableSearchBox component renders a search input box with a search button.
 * 
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - Optional additional class names for the search box.
 * @param {string} [props.placeholder] - Optional placeholder text for the input.
 * @param {string} [props.text] - Optional initial text value for the input.
 * @param {bool} [props.autoFocus] - Optional flag to set the input to autofocus.
 * @param {React.MutableRefObject} [props.ref]
 * @param {() => void} [onClick]
 * @returns {JSX.Element} The rendered search box component.
 */
export default function ScalableSearchBox(props) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className={`grow self-stretch justify-stretch flex search-box rounded-full h-14 max-w-[720px] bg-[--md-sys-color-surface-container] text-[--md-sys-color-on-surface-container] ${props.className}`} role='search' onClick={()=>{if (pathname !== "/search") router.push("/search")}}>
      <div className="state-layer self-stretch relative rounded-full pl-6 pr-1 gap-1 flex items-center w-full">
        <md-ripple />
        <input className='border-1 outline-none bg-transparent self-stretch flex-grow flex' type='text' placeholder={props.placeholder} value={props.text} ref={props.ref} />
        <TextButton>
          <span className='material-symbols-outlined'>search</span>
        </TextButton>
      </div>
    </div>
  )
}