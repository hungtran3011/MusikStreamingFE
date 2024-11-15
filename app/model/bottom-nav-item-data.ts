import { ImageProps } from "./image-props";
export type BottomNavItemData = {
    text: string;
    badgevalue?: number;
    onClick?: () => void;
    href: string;
    img?: ImageProps,
};