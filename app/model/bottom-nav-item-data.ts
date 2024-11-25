import { ImageProps } from "./image-props";
export type BottomNavItemData = {
    text: string;
    onClick?: () => void;
    href: string;
    icon?: string;
};