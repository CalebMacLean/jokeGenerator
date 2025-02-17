// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Renders Application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
registerServiceWorker();