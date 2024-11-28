import "./date-input.css"

export default function DateInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  className,
  ...props
}) {
  return (
    <div className="date-input-wrapper border-2 pt-2 border-[--md-sys-color-outline] rounded-[4px] max-w-[560px] w-[80vw] flex flex-col px-4 focus:outline-1 transition-transform focus-within:border-[--md-sys-color-primary] focus-within:text-[--md-sys-color-primary] duration-300 ease-in-out">
    <label htmlFor="date-input" className="bg-[--md-sys-color-background] w-fit ">{label}</label>
    <input aria-label={label} type="date" className="date-input bg-transparent pb-2 text-[--md-sys-color-on-surface] outline-none" placeholder=""
    min="1900-01-01" max="2011-12-31"/>
    
    </div>
  );
}