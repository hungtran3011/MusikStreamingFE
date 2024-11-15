import { ImageProps } from "./image-props";
export type NavItemData = {
    text: string;
    badgevalue?: number;
    onClick?: () => void;
    href: string;
    type: number;
    img?: ImageProps,
};