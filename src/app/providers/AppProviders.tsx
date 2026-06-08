import type { ReactNode } from 'react';

import { ViewModelStoreBase } from 'mobx-view-model';
import { ViewModelsProvider } from 'mobx-view-model-react';

import { GlobalStyles } from '../theme/globalStyles';
import { ThemeProvider } from './ThemeProvider';

const viewModelStore = new ViewModelStoreBase();

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ViewModelsProvider value={viewModelStore}>
    <ThemeProvider>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  </ViewModelsProvider>
);
