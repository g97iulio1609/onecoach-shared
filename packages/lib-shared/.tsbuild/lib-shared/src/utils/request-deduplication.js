/**
 * Request Deduplication Utility
 *
 * Prevents duplicate requests by tracking in-flight requests at module level.
 * Works even in React Strict Mode where components mount/unmount/remount.
 *
 * Usage:
 * ```ts
 * const response = await deduplicateRequest(
 *   '/api/agents/main',
 *   () => fetch('/api/agents/main', { method: 'POST', body: ... })
 * );
 * ```
 */
/**
 * Singleton map to track pending requests
 * Key: endpoint + hash of params
 * Value: pending request info
 */
const pendingRequests = new Map();
/**
 * Generate a unique key for a request based on endpoint and params
 */
function generateRequestKey(endpoint, params) {
    const paramsHash = params ? JSON.stringify(params) : '';
    return `${endpoint}:${paramsHash}`;
}
/**
 * Cleanup old pending requests (older than 5 minutes)
 * This prevents memory leaks if a request never completes
 */
function cleanupOldRequests() {
    const now = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 minutes
    for (const [key, request] of pendingRequests.entries()) {
        if (now - request.timestamp > maxAge) {
            request.abortController.abort();
            pendingRequests.delete(key);
        }
    }
}
/**
 * Deduplicate a request
 *
 * If a request with the same endpoint and params is already in flight,
 * returns the existing promise instead of making a new request.
 *
 * @param endpoint - The API endpoint (used for key generation)
 * @param requestFn - Function that makes the actual request
 * @param params - Optional params to include in the deduplication key
 * @returns Promise that resolves/rejects with the request result
 */
export async function deduplicateRequest(endpoint, requestFn, params) {
    // Cleanup old requests periodically
    if (pendingRequests.size > 0 && Math.random() < 0.1) {
        cleanupOldRequests();
    }
    const key = generateRequestKey(endpoint, params);
    // Check if there's already a pending request with the same key
    const existingRequest = pendingRequests.get(key);
    if (existingRequest) {
        // Return the existing promise instead of making a new request
        return existingRequest.promise;
    }
    // Create new AbortController for this request
    const abortController = new AbortController();
    // Create the request promise
    const promise = requestFn(abortController.signal)
        .then((result) => {
        // Remove from pending requests on success
        pendingRequests.delete(key);
        return result;
    })
        .catch((error) => {
        // Remove from pending requests on error
        pendingRequests.delete(key);
        throw error;
    });
    // Store the pending request
    pendingRequests.set(key, {
        promise,
        abortController,
        timestamp: Date.now(),
    });
    return promise;
}
/**
 * Cancel a pending request by endpoint and params
 *
 * @param endpoint - The API endpoint
 * @param params - Optional params to match
 * @returns true if a request was cancelled, false otherwise
 */
export function cancelRequest(endpoint, params) {
    const key = generateRequestKey(endpoint, params);
    const pendingRequest = pendingRequests.get(key);
    if (pendingRequest) {
        pendingRequest.abortController.abort();
        pendingRequests.delete(key);
        return true;
    }
    return false;
}
/**
 * Clear all pending requests
 * Useful for cleanup or testing
 */
export function clearAllRequests() {
    for (const request of pendingRequests.values()) {
        request.abortController.abort();
    }
    pendingRequests.clear();
}
/**
 * Get count of pending requests
 * Useful for debugging
 */
export function getPendingRequestCount() {
    return pendingRequests.size;
}
