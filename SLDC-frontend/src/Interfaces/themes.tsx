export interface IBreakPoints {
  base: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface IColors {
  sldcLightBlue: string;
  sldcDarkBlue: string;
  sldcWhite: string;
  sldcBlack: string;
  sldcGray: string;
}

export interface ITheme {
  breakpoints: IBreakPoints;
  colors: IColors;
}
