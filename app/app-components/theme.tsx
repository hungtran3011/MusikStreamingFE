import {argbFromHex, themeFromSourceColor } from '@material/material-color-utilities';

const theme = themeFromSourceColor(argbFromHex('#576421'));
console.log(theme.palettes);