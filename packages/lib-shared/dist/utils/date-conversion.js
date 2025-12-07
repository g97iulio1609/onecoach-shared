/**
 * Date Conversion Utilities
 *
 * Clean utilities for handling Date/string conversions between
 * Prisma entities and domain types following SOLID principles.
 */
/**
 * Converts Date to ISO string for domain types
 *
 * @param date - Date object or null/undefined
 * @returns ISO string or null
 */
export function dateToString(date) {
    if (!date)
        return null;
    return date.toISOString();
}
/**
 * Converts ISO string to Date for Prisma operations
 *
 * @param dateString - ISO string or null/undefined
 * @returns Date object or null
 */
export function stringToDate(dateString) {
    if (!dateString)
        return null;
    return new Date(dateString);
}
/**
 * Ensures a value is a Date object
 *
 * @param value - Date, string, or null/undefined
 * @returns Date object or null
 */
export function ensureDate(value) {
    if (!value)
        return null;
    if (value instanceof Date)
        return value;
    return new Date(value);
}
/**
 * Converts array of dates to strings
 *
 * @param dates - Array of Date objects
 * @returns Array of ISO strings
 */
export function datesToStrings(dates) {
    return dates.map(dateToString);
}
/**
 * Converts array of strings to dates
 *
 * @param strings - Array of ISO strings
 * @returns Array of Date objects
 */
export function stringsToDates(strings) {
    return strings.map(stringToDate);
}
