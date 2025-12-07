/**
 * Date Helper Utilities
 *
 * Centralized date manipulation and formatting functions.
 * Future-proof alternative to date-fns usage.
 */
/**
 * Add days to a date
 */
export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
/**
 * Subtract days from a date
 */
export function subtractDays(date, days) {
    return addDays(date, -days);
}
/**
 * Get start of day (00:00:00)
 */
export function startOfDay(date) {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}
/**
 * Get end of day (23:59:59)
 */
export function endOfDay(date) {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
}
/**
 * Check if two dates are on the same day
 */
export function isSameDay(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
}
/**
 * Format date to YYYY-MM-DD (ISO date format)
 */
export function formatISODate(date) {
    const isoString = date.toISOString();
    const datePart = isoString.split('T')[0];
    if (!datePart) {
        throw new Error('Failed to format date to ISO format');
    }
    return datePart;
}
/**
 * Parse ISO date string (YYYY-MM-DD) to Date
 */
export function parseISODate(isoString) {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid ISO date string: ${isoString}`);
    }
    return date;
}
/**
 * Get date range for a period string
 */
export function getDateRangeFromPeriod(period) {
    const endDate = new Date();
    const startDate = new Date();
    const daysMap = {
        '7d': 7,
        '30d': 30,
        '90d': 90,
        '1y': 365,
    };
    const days = daysMap[period] || 30;
    startDate.setDate(startDate.getDate() - days);
    return { startDate, endDate };
}
/**
 * Get number of days between two dates
 */
export function getDaysDifference(date1, date2) {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
