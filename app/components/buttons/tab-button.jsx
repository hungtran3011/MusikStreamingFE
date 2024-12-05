import { twMerge } from "tailwind-merge";


export default function TabButton({className = "", label, isActive, onClick, hasIcon = false, icon = "" }) {
    return (
        <button className={twMerge(`tab-button px-5 py-2 cursor-pointer ${isActive ? 'active border-b-2 border-[--md-sys-color-primary]' : ''} relative`, className)} onClick={onClick}>
            {hasIcon && <span className="material-symbols-outlined">{icon}</span>}
            <md-ripple/>
            {label}
        </button>
    )
}