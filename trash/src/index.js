// v1
// import {React,StrictMode} from 'react';
// import {ReactDOM,createRoot} from 'react-dom/client';
// import App from './App';

// const root = createRoot(document.getElementById('root'));
// root.render(
//     <StrictMode>
//     <App/>
//     </StrictMode>
// );

// v2
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);
// root.render(
//     <StrictMode>
//     <App/>
//     </StrictMode>
// );

// v3
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootElement);
root.render(
    <React.StrictMode>
    <App/>
    </React.StrictMode>
);