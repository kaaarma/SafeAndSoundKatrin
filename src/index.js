import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import your CSS file
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brown } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: brown[500],
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
