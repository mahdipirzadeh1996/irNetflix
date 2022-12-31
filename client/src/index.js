import React from 'react';
import ReactDOM from 'react-dom';

import "./index.css"
import App from './App';
import { AuthContextProvider } from "./context/authContext/AuthContext";

window.$url ="http://localhost:8800/";

ReactDOM.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>,
    document.getElementById('root')
);