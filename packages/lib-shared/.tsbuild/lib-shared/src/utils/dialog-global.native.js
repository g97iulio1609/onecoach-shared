/**
 * Global Dialog Utilities - Cross-platform
 *
 * Provides global functions to replace window.alert, window.confirm, window.prompt
 * Uses React Native Alert API for mobile
 *
 * Usage:
 *   import { dialog } from '@onecoach/lib-shared/utils/dialog-global';
 *   await dialog.alert('Message');
 *   const confirmed = await dialog.confirm('Are you sure?');
 *   const value = await dialog.prompt('Enter value:');
 */
import { Alert } from 'react-native';
import { useDialogStore } from '@onecoach/lib-stores/dialog.store';
// Get dialog functions from store (can be called outside React components)
const getDialogStore = () => useDialogStore.getState();
export const dialog = {
    alert: async (message, title) => {
        try {
            const store = getDialogStore();
            return store.alert(message, title);
        }
        catch (_error) {
            // Fallback to React Native Alert if store not initialized
            return new Promise((resolve) => {
                Alert.alert(title || 'Avviso', message, [{ text: 'OK', onPress: () => resolve() }]);
            });
        }
    },
    confirm: async (message, title) => {
        try {
            const store = getDialogStore();
            return store.confirm(message, title);
        }
        catch (_error) {
            // Fallback to React Native Alert confirm if store not initialized
            return new Promise((resolve) => {
                Alert.alert(title || 'Conferma', message, [
                    { text: 'Annulla', style: 'cancel', onPress: () => resolve(false) },
                    { text: 'Conferma', onPress: () => resolve(true) },
                ]);
            });
        }
    },
    prompt: async (message, defaultValue, title) => {
        try {
            const store = getDialogStore();
            return store.prompt(message, defaultValue, title);
        }
        catch (_error) {
            // Fallback to React Native Alert prompt if store not initialized
            return new Promise((resolve) => {
                Alert.prompt(title || 'Input', message, [
                    { text: 'Annulla', style: 'cancel', onPress: () => resolve(null) },
                    { text: 'OK', onPress: (text) => resolve(text || null) },
                ], 'plain-text', defaultValue);
            });
        }
    },
    info: async (message, title) => {
        try {
            const store = getDialogStore();
            return store.info(message, title);
        }
        catch (_error) {
            return new Promise((resolve) => {
                Alert.alert(title || 'Info', message, [{ text: 'OK', onPress: () => resolve() }]);
            });
        }
    },
    success: async (message, title) => {
        try {
            const store = getDialogStore();
            return store.success(message, title);
        }
        catch (_error) {
            return new Promise((resolve) => {
                Alert.alert(title || 'Successo', message, [{ text: 'OK', onPress: () => resolve() }]);
            });
        }
    },
    warning: async (message, title) => {
        try {
            const store = getDialogStore();
            return store.warning(message, title);
        }
        catch (_error) {
            return new Promise((resolve) => {
                Alert.alert(title || 'Attenzione', message, [{ text: 'OK', onPress: () => resolve() }]);
            });
        }
    },
    error: async (message, title) => {
        try {
            const store = getDialogStore();
            return store.error(message, title);
        }
        catch (error) {
            return new Promise((resolve) => {
                Alert.alert(title || 'Errore', message, [{ text: 'OK', onPress: () => resolve() }]);
            });
        }
    },
};
