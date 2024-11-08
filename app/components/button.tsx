import '@material/web/ripple/ripple';

export default function FilledButton(
    props: {
        className?: string,
        onClick?: () => void,
        icon?: string,
        showIcon?: boolean,
        children?: string,
    }
) {
    let showIcon = props.showIcon;
    if (props.icon === undefined || props.icon === '') {
        showIcon = false;
    }
    else if (props.showIcon === undefined) {
        showIcon = false;
    }
    return(
        <div className="text-btn flex items-center" role='button'>
            <div className={`state-layer relative p-4 ${showIcon?"":"pr-6"} gap-3 rounded-full flex items-center bg-[--md-sys-color-primary] text-[--md-sys-color-on-primary]`}>
                <md-ripple className="ripple"></md-ripple>
                <span className={`material-symbols-outlined ${showIcon ? "block" : "none"}`}>{props.icon}</span>
                <p className='text-center font-medium'>{props.children}</p>
            </div>
        </div>
    )
}