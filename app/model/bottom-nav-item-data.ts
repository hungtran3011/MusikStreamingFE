import { ImageData } from "./image-data";
export type BottomNavItemData = {
    text: string;
    badgevalue?: number;
    onClick?: () => void;
    href: string;
    img?: ImageData,
};