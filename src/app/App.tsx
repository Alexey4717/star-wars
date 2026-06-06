import { Route, Routes } from 'react-router-dom';

import { CharactersPage } from '@/pages/characters/CharactersPage';
import { HomePage } from '@/pages/home/HomePage';

import { AppLayout } from './layout/AppLayout/AppLayout';
import { AppProviders } from './providers/AppProviders';

const App = () => (
  <AppProviders>
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
      </Routes>
    </AppLayout>
  </AppProviders>
);

export default App;
