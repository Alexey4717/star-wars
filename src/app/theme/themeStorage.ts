export type ResolvedTheme = 'light' | 'dark';
export type StoredThemePreference = ResolvedTheme | null;

const STORAGE_KEY = 'swapi-theme';

export function getStoredThemePreference(): StoredThemePreference {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return null;
}

export function setStoredThemePreference(preference: ResolvedTheme): void {
  localStorage.setItem(STORAGE_KEY, preference);
}

export function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(
  stored: StoredThemePreference,
  systemTheme: ResolvedTheme,
): ResolvedTheme {
  return stored ?? systemTheme;
}
