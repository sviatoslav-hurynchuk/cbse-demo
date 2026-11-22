import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from './store';

const rootElement = document.getElementById('root');
if (rootElement) {
  rootElement.classList.toggle('dark', store.getState().theme.theme === 'dark');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
