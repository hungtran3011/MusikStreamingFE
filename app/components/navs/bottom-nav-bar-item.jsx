import 'material-symbols';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import './bottom-nav-bar.css';

export default function BottomNavBarItem(
    props
) {
    const pathname = usePathname();
    return (
        <div className="bottom-nav-item">
            <Link href={props.href} className="bottom-nav-item flex flex-col justify-center items-center">
                <div className={`state-layer relative selected-${pathname == props.href} rounded-full`}>
                    <md-ripple></md-ripple>
                    <div className="icon flex flex-col items-center text-center py-3 px-4">
                        <span className="material-symbols-outlined">{props.icon}</span>
                    </div>
                </div>
                <div className="label">
                    <p>{props.text}</p>
                </div>
            </Link>
        </div>
    );
}