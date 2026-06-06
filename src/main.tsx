import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/App';
import { configureMobx } from '@/app/store/configureMobx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

configureMobx();

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
