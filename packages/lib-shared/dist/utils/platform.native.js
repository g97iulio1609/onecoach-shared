/**
 * Platform Detection Utilities - React Native
 *
 * React Native specific implementations
 */
import { Platform } from 'react-native';
/**
 * Check platform OS
 */
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
/**
 * Not applicable on React Native
 */
export function hasAPI(_apiName) {
    return false;
}
/**
 * Not applicable on React Native
 */
export function getWindow() {
    return undefined;
}
/**
 * Not applicable on React Native
 */
export function getDocument() {
    return undefined;
}
/**
 * Not applicable on React Native (use AsyncStorage instead)
 */
export function getLocalStorage() {
    return null;
}
/**
 * Not applicable on React Native
 */
export function getSessionStorage() {
    return null;
}
/**
 * Check if running in development mode
 */
export const isDevelopment = __DEV__;
/**
 * Check if running in production mode
 */
export const isProduction = !__DEV__;
/**
 * Check if running in test mode
 */
export const isTest = process.env.NODE_ENV === 'test';
/**
 * Platform-agnostic noop function
 */
export const noop = () => { };
/**
 * Platform-agnostic delay function
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/**
 * Safely parse JSON with fallback
 */
export function safeJSONParse(json, fallback) {
    try {
        return JSON.parse(json);
    }
    catch (_error) {
        return fallback;
    }
}
/**
 * Safely stringify JSON with fallback
 */
export function safeJSONStringify(value, fallback = '{}') {
    try {
        return JSON.stringify(value);
    }
    catch (_error) {
        return fallback;
    }
}
