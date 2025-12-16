/**
 * Theme Store
 *
 * Zustand store for cross-platform theming.
 * Persists to both localStorage (for Zustand) and cookies (for SSR).
 *
 * Storage keys:
 * - 'ui-storage' (JSON) - Zustand persist middleware
 * - 'onecoach-theme' (string) - For layout.tsx SSR script
 */
import type { ThemePreference, ResolvedTheme, ThemeColors, ThemeState, ThemeActions, ThemeStore } from './types';
export declare const THEME_STORAGE_KEY = "onecoach-theme";
export declare const lightColors: ThemeColors;
export declare const darkColors: ThemeColors;
export declare const useThemeStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<ThemeStore>, "setState" | "devtools"> & {
    setState(partial: ThemeStore | Partial<ThemeStore> | ((state: ThemeStore) => ThemeStore | Partial<ThemeStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: ThemeStore | ((state: ThemeStore) => ThemeStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "setState" | "persist"> & {
    setState(partial: ThemeStore | Partial<ThemeStore> | ((state: ThemeStore) => ThemeStore | Partial<ThemeStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: ThemeStore | ((state: ThemeStore) => ThemeStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<ThemeStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ThemeStore) => void) => () => void;
        onFinishHydration: (fn: (state: ThemeStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<ThemeStore, unknown, unknown>>;
    };
}>;
interface ThemeHookResult {
    theme: ThemePreference;
    actualTheme: ResolvedTheme;
    setTheme: (theme: ThemePreference) => void;
    toggleTheme: () => void;
    isDark: boolean;
    colors: ThemeColors;
}
/**
 * Hook to access theme state and actions.
 * Safe for SSR with stable server snapshot.
 */
export declare function useTheme(): ThemeHookResult;
/**
 * Hook to sync system theme preference changes.
 * Call this once at the app root level.
 */
export declare function useSystemThemeSync(): void;
export type { ThemePreference, ResolvedTheme, ThemeColors, ThemeState, ThemeActions, ThemeStore };
//# sourceMappingURL=theme.store.d.ts.map