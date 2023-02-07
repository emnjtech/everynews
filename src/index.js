import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppState from './Context/AppState';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
    <AppState>
        <App />
    </AppState>
    </BrowserRouter>

);
