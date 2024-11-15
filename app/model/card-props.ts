import { ImageProps } from "./image-props";

export type CardProps = {
    title: string;
    subtitle: string;
    img: ImageProps;
    href: string;
    onClick?: () => void;
}