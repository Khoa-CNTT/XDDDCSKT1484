import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { UserProvider } from '~/context/UserContext';
import { NavBarsProvider } from './context/NavBarsContext';
import './utils/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <UserProvider>
        <NavBarsProvider>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </NavBarsProvider>
    </UserProvider>
    // </React.StrictMode >, 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
