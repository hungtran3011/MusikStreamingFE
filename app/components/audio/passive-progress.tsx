export default function PassiveProgress(props:{
    className?: string;
}) {
    return (
        <div className={`${props.className} passive-progress w-full bg-[--md-sys-color-outline] h-1 items-center`}>
            <div className="passive-progress-bar-track flex flex-start">
                <div className="passive-progress-bar-inner bg-[--md-sys-color-primary-fixed]">
                </div>
            </div>
        </div>
    );
}