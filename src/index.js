import React from 'react';
import ReactDOM from 'react-dom/client';
import { Phonebook } from 'components/App';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <Phonebook />
     </ThemeProvider>
  </React.StrictMode>
);