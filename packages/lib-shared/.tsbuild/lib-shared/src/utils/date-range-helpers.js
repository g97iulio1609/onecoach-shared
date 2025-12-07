/**
 * Date Range Helpers
 *
 * Utility functions for calculating date ranges from periods.
 * Following DRY principle - centralized date range logic for analytics.
 */
/**
 * Period to days mapping
 */
const PERIOD_DAYS = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
    '1y': 365,
};
/**
 * Calculate date range from period
 *
 * @param period - The time period ('7d', '30d', '90d', '1y', 'custom')
 * @param customRange - Custom date range (required if period is 'custom')
 * @returns Object with startDate and endDate
 */
export function getDateRangeFromPeriod(period, customRange) {
    // Use custom range if period is 'custom'
    if (period === 'custom') {
        if (!customRange) {
            throw new Error('Custom range is required when period is "custom"');
        }
        return {
            startDate: customRange.startDate,
            endDate: customRange.endDate,
        };
    }
    // Calculate date range based on period
    const daysAgo = PERIOD_DAYS[period];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    startDate.setHours(0, 0, 0, 0); // Start of day
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999); // End of day
    return { startDate, endDate };
}
/**
 * Format date range for display
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Formatted string
 */
export function formatDateRange(startDate, endDate) {
    const formatDate = (date) => {
        return date.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}
/**
 * Calculate number of days between two dates
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Number of days
 */
export function getDaysBetween(startDate, endDate) {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
/**
 * Check if a date is within a date range
 *
 * @param date - Date to check
 * @param startDate - Start date
 * @param endDate - End date
 * @returns True if date is within range
 */
export function isDateInRange(date, startDate, endDate) {
    return date >= startDate && date <= endDate;
}
/**
 * Get array of dates between start and end
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Array of dates
 */
export function getDatesBetween(startDate, endDate) {
    const dates = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}
/**
 * Get period display label
 *
 * @param period - The period
 * @returns Display label in Italian
 */
export function getPeriodLabel(period) {
    const labels = {
        '7d': 'Ultimi 7 giorni',
        '30d': 'Ultimi 30 giorni',
        '90d': 'Ultimi 90 giorni',
        '1y': 'Ultimo anno',
        custom: 'Personalizzato',
    };
    return labels[period];
}
