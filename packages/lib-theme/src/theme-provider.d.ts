import type { ThemePreference, ResolvedTheme, ThemeProviderProps } from './types';
interface ThemeContextValue {
    theme: ThemePreference;
    actualTheme: ResolvedTheme;
    setTheme: (theme: ThemePreference) => void;
    toggleTheme: () => void;
}
export declare function ThemeProvider({ children, defaultTheme, storageKey: _storageKey, initialTheme, initialActualTheme, }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to access theme context.
 * Prefer using `useTheme` from './theme.store' directly for better performance.
 * This hook is provided for legacy compatibility.
 */
export declare function useThemeContext(): ThemeContextValue;
export {};
//# sourceMappingURL=theme-provider.d.ts.map