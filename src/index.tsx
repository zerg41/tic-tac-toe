import React from 'react';
import { createRoot } from 'react-dom/client';
// components
import App from 'app';
// styles
import 'styles/main.scss';

const rootEl = createRoot(document.getElementById('root') as HTMLDivElement);

rootEl.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
