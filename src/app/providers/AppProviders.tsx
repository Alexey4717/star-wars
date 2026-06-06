import type { ReactNode } from 'react';

import { GlobalStyles } from '../theme/globalStyles';
import { ThemeProvider } from './ThemeProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);
