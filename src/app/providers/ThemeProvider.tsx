import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ConfigProvider } from 'antd';

import { darkTheme } from '../theme/darkTheme';
import { lightTheme } from '../theme/lightTheme';
import {
  getStoredThemePreference,
  getSystemTheme,
  type ResolvedTheme,
  resolveTheme,
  type StoredThemePreference,
  setStoredThemePreference,
} from '../theme/themeStorage';

interface ThemeContextValue {
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ResolvedTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [storedPreference, setStoredPreferenceState] = useState<StoredThemePreference>(() =>
    getStoredThemePreference(),
  );
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme());

  const resolvedTheme = useMemo(
    () => resolveTheme(storedPreference, systemTheme),
    [storedPreference, systemTheme],
  );

  const setTheme = useCallback((theme: ResolvedTheme) => {
    setStoredPreferenceState(theme);
    setStoredThemePreference(theme);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const contextValue = useMemo(
    () => ({
      resolvedTheme,
      setTheme,
    }),
    [resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={resolvedTheme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
