import { ImageData } from "./image-data";
export type NavItemData = {
    text: string;
    badgevalue?: number;
    onClick?: () => void;
    href: string;
    type: number;
    img?: ImageData,
};