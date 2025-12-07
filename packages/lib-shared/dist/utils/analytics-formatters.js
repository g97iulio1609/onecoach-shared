/**
 * Analytics Formatters
 *
 * Utility functions for formatting analytics data for display.
 * Following KISS and DRY principles.
 */
import { format, intervalToDuration } from 'date-fns';
import { it } from 'date-fns/locale';
export function formatMetricChange(before, after, metricType = 'generic') {
    if (before == null || after == null)
        return null;
    const value = after - before;
    const percentage = before !== 0 ? (value / before) * 100 : 0;
    // Determine if positive change is good based on metric type
    const positiveIsGood = metricType === 'muscleMass' || metricType === 'volume' || metricType === 'generic';
    const negativeIsGood = metricType === 'weight' || metricType === 'bodyFat';
    let isPositive = false;
    let isNegative = false;
    if (Math.abs(percentage) < 0.1) {
        // Negligible change
        isPositive = false;
        isNegative = false;
    }
    else if (value > 0) {
        isPositive = positiveIsGood;
        isNegative = negativeIsGood;
    }
    else if (value < 0) {
        isPositive = negativeIsGood;
        isNegative = positiveIsGood;
    }
    const trend = Math.abs(percentage) < 0.1 ? 'neutral' : value > 0 ? 'up' : 'down';
    return {
        value,
        percentage,
        isPositive,
        isNegative,
        trend,
    };
}
/**
 * Format duration in seconds to human-readable string
 */
export function formatDuration(seconds) {
    if (seconds < 60) {
        return '0s';
    }
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    const parts = [];
    if (duration.hours)
        parts.push(`${duration.hours}h`);
    if (duration.minutes)
        parts.push(`${duration.minutes}m`);
    if (duration.seconds && !duration.hours)
        parts.push(`${duration.seconds}s`);
    return parts.join(' ');
}
/**
 * Calculate trend direction from time series data
 */
export function calculateTrend(data) {
    if (data.length < 2)
        return 'neutral';
    // Simple linear regression slope
    const n = data.length;
    const xMean = (n - 1) / 2;
    let xySum = 0;
    let xxSum = 0;
    for (let i = 0; i < n; i++) {
        const value = data[i];
        if (value === undefined) {
            continue;
        }
        const x = i - xMean;
        xySum += x * value;
        xxSum += x * x;
    }
    const slope = xySum / xxSum;
    if (Math.abs(slope) < 0.01)
        return 'neutral';
    return slope > 0 ? 'up' : 'down';
}
export function formatMacros(macros, compact = false) {
    if (compact) {
        return `${Math.round(macros.calories)}kcal • P:${Math.round(macros.protein)}g • C:${Math.round(macros.carbs)}g • F:${Math.round(macros.fats)}g`;
    }
    return `Calories: ${Math.round(macros.calories)} • Protein: ${Math.round(macros.protein)}g • Carbs: ${Math.round(macros.carbs)}g • Fats: ${Math.round(macros.fats)}g`;
}
/**
 * Format percentage
 */
export function formatPercentage(value, total, decimals = 0) {
    if (total === 0)
        return '0%';
    const percentage = (value / total) * 100;
    return `${percentage.toFixed(decimals)}%`;
}
/**
 * Format weight with unit
 */
export function formatWeight(value, unit = 'kg', decimals) {
    const frac = Number.isInteger(value) ? 0 : 1;
    const digits = decimals ?? frac;
    return `${value.toFixed(digits)}${unit}`;
}
/**
 * Format number with unit and optional decimals
 */
export function formatNumber(value, unit, decimals = 0, locale = 'it-IT') {
    const formatted = value.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
    return unit ? `${formatted} ${unit}` : formatted;
}
/**
 * Format date for analytics
 */
export function formatAnalyticsDate(date, formatStr = 'dd/MM/yyyy') {
    return format(date, formatStr, { locale: it });
}
/**
 * Format date range
 */
export function formatDateRange(startDate, endDate) {
    return `${format(startDate, 'dd/MM/yyyy')} - ${format(endDate, 'dd/MM/yyyy')}`;
}
/**
 * Format change value with sign
 */
export function formatChangeValue(value, unit, decimals = 1) {
    const sign = value > 0 ? '+' : '';
    const formatted = value.toFixed(decimals);
    return unit ? `${sign}${formatted}${unit}` : `${sign}${formatted}`;
}
/**
 * Get color class for metric value based on context
 */
export function getMetricColorClass(value, target, tolerance = 0.1 // 10% tolerance
) {
    const ratio = value / target;
    if (ratio >= 1 - tolerance && ratio <= 1 + tolerance) {
        return 'text-green-600'; // On target
    }
    else if (ratio >= 1 - tolerance * 2 && ratio <= 1 + tolerance * 2) {
        return 'text-amber-600'; // Close to target
    }
    else {
        return 'text-red-600'; // Far from target
    }
}
/**
 * Get progress bar color based on percentage
 */
export function getProgressBarColor(percentage) {
    if (percentage < 50)
        return 'bg-red-500';
    if (percentage < 80)
        return 'bg-amber-500';
    return 'bg-green-500';
}
