import '@material/web/ripple/ripple';

export default function TextButton(
    props: {
        className?: string,
        onClick?: () => void,
        children: React.ReactNode
    }
) {
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