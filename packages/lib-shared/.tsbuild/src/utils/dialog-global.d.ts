/**
 * Global Dialog Utilities
 *
 * Provides global functions to replace window.alert, window.confirm, window.prompt
 * These functions use Zustand store directly (can be called outside React components)
 *
 * Usage:
 *   import { dialog } from '@onecoach/lib-shared/utils/dialog-global';
 *   await dialog.alert('Message');
 *   const confirmed = await dialog.confirm('Are you sure?');
 *   const value = await dialog.prompt('Enter value:');
 */
export declare const dialog: {
    alert: (message: string, options?: {
        title?: string;
        confirmLabel?: string;
    }) => Promise<void>;
    confirm: (message: string, options?: {
        title?: string;
        confirmLabel?: string;
        cancelLabel?: string;
    }) => Promise<boolean>;
    prompt: (message: string, options?: {
        title?: string;
        confirmLabel?: string;
        cancelLabel?: string;
        defaultValue?: string;
        placeholder?: string;
    }) => Promise<string | null>;
    info: (message: string, options?: {
        title?: string;
        confirmLabel?: string;
    }) => Promise<void>;
    success: (message: string, options?: {
        title?: string;
        confirmLabel?: string;
    }) => Promise<void>;
    warning: (message: string, options?: {
        title?: string;
        confirmLabel?: string;
        cancelLabel?: string;
    }) => Promise<void>;
    error: (message: string, options?: {
        title?: string;
        confirmLabel?: string;
    }) => Promise<void>;
};
//# sourceMappingURL=dialog-global.d.ts.map