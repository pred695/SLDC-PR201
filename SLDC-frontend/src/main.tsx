import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { IBreakPoints, ITheme } from './Interfaces/themes';

const BreakPoints: IBreakPoints = {
  Base: '0px',
  Xs: '375px',
  Sm: '576px',
  Md: '768px',
  Lg: '992px',
  Xl: '1200px',
};

const theme: ITheme = extendTheme({
  IBreakPoints: BreakPoints,
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
