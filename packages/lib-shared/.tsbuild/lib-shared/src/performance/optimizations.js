/**
 * Performance Optimizations
 *
 * Utilities for optimizing bundle size and runtime performance
 */
import React from 'react';
/**
 * Lazy load component with React.lazy
 */
export function lazyLoad(importFn) {
    return React.lazy(importFn);
}
/**
 * Debounce function for performance
 */
export function debounce(func, wait) {
    let timeout = null;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}
/**
 * Throttle function for performance
 */
export function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
/**
 * Memoize expensive computations
 */
export function memoize(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}
/**
 * Intersection Observer for lazy loading
 */
export function useIntersectionObserver(elementRef, options = {}) {
    const [isIntersecting, setIsIntersecting] = React.useState(false);
    React.useEffect(() => {
        const element = elementRef.current;
        if (!element)
            return;
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                setIsIntersecting(entry.isIntersecting);
            }
        }, options);
        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, [elementRef, options]);
    return isIntersecting;
}
