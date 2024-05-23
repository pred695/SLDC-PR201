import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { IBreakPoints, IColors, ITheme } from './Interfaces/themes';

const breakpoints: IBreakPoints = {
  base: '0px',
  xs: '375px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

const colors: IColors = {
  sldcLightBlue: "#8A99DD",
  sldcDarkBlue: "#324C89",
  sldcWhite: "#FFFFFF",
  sldcBlack: "#131313",
  sldcGray: "#262A33",
}

const theme: ITheme = extendTheme({
  // IBreakPoints: BreakPoints,
  breakpoints,
  colors, 
}) as ITheme;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
