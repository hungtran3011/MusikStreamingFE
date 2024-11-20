'use client';

import 'material-symbols';
import Link from 'next/link';
import BottomNavBarItem from './bottom-nav-bar-item';
import { NavItemData } from '@/app/model/nav-item-props';

/**
 * A responsive bottom navigation bar component that displays on mobile devices.
 * Renders a list of navigation items with icons and text.
 * Hides automatically on medium and larger screen sizes.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply to the container
 * @param {Object.<string, NavItemData>} props.items - Navigation items where the key is the icon name
 *        and the value contains the text and href for the item
 * @returns {JSX.Element} A responsive bottom navigation bar
 */
export default function BottomNavBar(
    props: {
        className?: string,
        items: {
            [key: string] : NavItemData
        }
    }
) {
    return (
        // Container with responsive hiding on md breakpoint
        <div className={`${props.className} bottom-nav-bar p-3 flex items-center justify-around md:hidden`}>
            {/* Map through items object to render navigation items */}
            {Object.keys(props.items).map((key: string, index: number) => {
                return (
                    BottomNavBarItem(
                        {
                            key: index,
                            icon: key,
                            text: props.items[key]['text'],
                            href: props.items[key]['href']
                        }
                    )
                );
            })}
        </div>
    );
}