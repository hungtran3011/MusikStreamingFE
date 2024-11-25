import IconSmallButton from '@/app/components/buttons/icon-small-button';

/**
 * PlayButton component
 * 
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Optional class name for the button
 * @param {Function} [props.onClick] - Optional click handler for the button
 * @param {React.ReactNode} props.children - Child elements to be rendered inside the button
 * @returns {JSX.Element} The rendered TextButton component
 */
export default function PlayButton(props) {
  return(
      <IconSmallButton className="md:bg-[--md-sys-color-primary] md:text-[--md-sys-color-on-primary]" onClick={props.onClick}>
          {props.children}
      </IconSmallButton>
  )
}