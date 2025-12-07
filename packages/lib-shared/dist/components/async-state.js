/**
 * Async State Components
 *
 * Reusable components for loading and error states
 * Follows DRY principle - eliminates duplicate loading/error UI
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader2, AlertCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@OneCoach/ui';
/**
 * Loading state component
 */
export function LoadingState({ message = 'Caricamento...', size = 'md', className = '', }) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };
    return (_jsx("div", { className: `flex min-h-screen items-center justify-center ${className}`, children: _jsxs("div", { className: "text-center", children: [_jsx(Loader2, { className: `mx-auto animate-spin text-blue-500 ${sizeClasses[size]}` }), message && _jsx("p", { className: "mt-4 text-sm text-gray-600 dark:text-gray-400", children: message })] }) }));
}
/**
 * Error state component
 */
export function ErrorState({ error, title = 'Errore', onRetry, retryLabel = 'Riprova', action, className = '', }) {
    const errorMessage = error instanceof Error ? error.message : error || 'Si è verificato un errore';
    return (_jsx("div", { className: `flex min-h-screen items-center justify-center ${className}`, children: _jsxs("div", { className: "text-center", children: [_jsx(AlertCircle, { className: "mx-auto h-12 w-12 text-red-500" }), _jsx("h3", { className: "mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100", children: title }), _jsx("p", { className: "mt-2 text-sm text-red-600 dark:text-red-400", children: errorMessage }), action && _jsx("div", { className: "mt-4", children: action }), !action && onRetry && (_jsx(Button, { onClick: onRetry, variant: "default", className: "mt-4", children: retryLabel }))] }) }));
}
/**
 * Empty state component
 */
export function EmptyState({ title, message, icon, action, className = '' }) {
    return (_jsx("div", { className: `flex min-h-[400px] items-center justify-center ${className}`, children: _jsxs("div", { className: "text-center", children: [icon || _jsx(AlertTriangle, { className: "mx-auto h-12 w-12 text-gray-400" }), _jsx("h3", { className: "mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100", children: title }), message && _jsx("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: message }), action && _jsx("div", { className: "mt-4", children: action })] }) }));
}
