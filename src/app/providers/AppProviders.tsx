import type { ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { GlobalStyles } from '../theme/globalStyles';
import { ThemeProvider } from './ThemeProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <BrowserRouter>
    <ThemeProvider>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  </BrowserRouter>
);
