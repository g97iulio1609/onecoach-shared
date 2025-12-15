/**
 * Dark Mode Classes Utility
 *
 * Centralized dark mode class strings following DRY principle.
 * These constants can be reused across components to maintain consistency.
 */
import { type ClassValue } from 'clsx';
/**
 * Core dark mode classes for different surface levels and states
 */
export declare const darkModeClasses: {
    readonly bg: {
        readonly base: "bg-white dark:bg-neutral-900";
        readonly elevated: "bg-white dark:bg-neutral-800";
        readonly subtle: "bg-neutral-50 dark:bg-neutral-800/50";
        readonly muted: "bg-neutral-100 dark:bg-neutral-800";
        readonly hover: "hover:bg-neutral-50 dark:hover:bg-neutral-800";
        readonly active: "bg-blue-50 dark:bg-blue-900/20";
        readonly selected: "bg-primary-50 dark:bg-primary-900/20";
        readonly overlay: "bg-black/40 dark:bg-black/60";
        readonly backdrop: "bg-black/50 dark:bg-black/70 backdrop-blur-sm";
        readonly disabled: "bg-neutral-100 dark:bg-neutral-800/50 cursor-not-allowed";
    };
    readonly text: {
        readonly primary: "text-neutral-900 dark:text-neutral-100";
        readonly secondary: "text-neutral-700 dark:text-neutral-300";
        readonly tertiary: "text-neutral-600 dark:text-neutral-400";
        readonly muted: "text-neutral-500 dark:text-neutral-500";
        readonly disabled: "text-neutral-400 dark:text-neutral-600";
        readonly inverse: "text-white dark:text-neutral-900";
        readonly link: "text-primary-600 dark:text-primary-400";
        readonly brand: "text-primary-600 dark:text-primary-400";
    };
    readonly border: {
        readonly base: "border-neutral-200 dark:border-neutral-700";
        readonly strong: "border-neutral-300 dark:border-neutral-600";
        readonly subtle: "border-neutral-100 dark:border-neutral-800";
        readonly focus: "focus:border-primary-500 dark:focus:border-primary-400";
        readonly hover: "hover:border-neutral-300 dark:hover:border-neutral-600";
        readonly error: "border-red-300 dark:border-red-700";
        readonly success: "border-green-300 dark:border-green-700";
    };
    readonly interactive: {
        readonly hover: "hover:bg-neutral-100 dark:hover:bg-neutral-800";
        readonly active: "active:bg-neutral-200 dark:active:bg-neutral-700";
        readonly focus: "focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400";
        readonly focusVisible: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900";
        readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed";
    };
    readonly card: {
        readonly base: "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700";
        readonly elevated: "bg-white dark:bg-neutral-800 shadow-lg dark:shadow-2xl dark:shadow-neutral-950/50";
        readonly hover: "hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200";
        readonly interactive: "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-lg transition-all duration-300";
        readonly glass: "bg-white dark:bg-neutral-900/80 dark:bg-neutral-800/80 backdrop-blur-md border-neutral-200 dark:border-neutral-700";
    };
    readonly input: {
        readonly base: "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100";
        readonly placeholder: "placeholder-neutral-400 dark:placeholder-neutral-500";
        readonly disabled: "bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-600 cursor-not-allowed";
        readonly error: "border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500";
    };
    readonly nav: {
        readonly link: "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200";
        readonly active: "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium";
        readonly icon: "text-neutral-500 dark:text-neutral-400";
        readonly iconActive: "text-primary-600 dark:text-primary-400";
    };
    readonly semantic: {
        readonly success: {
            readonly bg: "bg-green-50 dark:bg-green-900/20";
            readonly text: "text-green-700 dark:text-green-400";
            readonly border: "border-green-200 dark:border-green-800";
        };
        readonly warning: {
            readonly bg: "bg-yellow-50 dark:bg-yellow-900/20";
            readonly text: "text-yellow-700 dark:text-yellow-400";
            readonly border: "border-yellow-200 dark:border-yellow-800";
        };
        readonly error: {
            readonly bg: "bg-red-50 dark:bg-red-900/20";
            readonly text: "text-red-700 dark:text-red-400";
            readonly border: "border-red-200 dark:border-red-800";
        };
        readonly info: {
            readonly bg: "bg-blue-50 dark:bg-blue-900/20";
            readonly text: "text-blue-700 dark:text-blue-400";
            readonly border: "border-blue-200 dark:border-blue-800";
        };
    };
    readonly shadow: {
        readonly sm: "shadow-sm dark:shadow-neutral-900/20";
        readonly md: "shadow-md dark:shadow-neutral-900/30";
        readonly lg: "shadow-lg dark:shadow-neutral-900/40";
        readonly xl: "shadow-xl dark:shadow-neutral-900/50";
    };
    readonly divider: {
        readonly base: "border-neutral-200 dark:border-neutral-700";
        readonly strong: "border-neutral-300 dark:border-neutral-600";
        readonly subtle: "border-neutral-100 dark:border-neutral-800";
    };
};
/**
 * Helper function to combine classes with stable ordering.
 * Uses clsx for conditional classes and tailwind-merge for deduplication.
 */
export declare function cn(...classes: ClassValue[]): string;
export type DarkModeClasses = typeof darkModeClasses;
//# sourceMappingURL=dark-mode-classes.d.ts.map