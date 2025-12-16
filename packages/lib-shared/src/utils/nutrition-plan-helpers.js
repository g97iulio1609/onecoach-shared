/**
 * Nutrition Plan Helper Utilities
 *
 * Future-proof utility functions for accessing NutritionPlan data.
 * Centralizes access patterns to avoid schema inconsistencies.
 */
/**
 * Get all goals from a nutrition plan
 */
export function getNutritionPlanGoals(plan) {
    return plan.goals || [];
}
/**
 * Get first goal (for display purposes)
 */
export function getNutritionPlanFirstGoal(plan) {
    return plan.goals && plan.goals.length > 0 ? (plan.goals[0] ?? null) : null;
}
/**
 * Get all days from a nutrition plan (flattened from weeks)
 */
export function getAllNutritionPlanDays(plan) {
    if (!plan.weeks || plan.weeks.length === 0) {
        return [];
    }
    return plan.weeks.flatMap((week) => week.days || []);
}
/**
 * Get total number of days in a nutrition plan
 */
export function getNutritionPlanTotalDays(plan) {
    return getAllNutritionPlanDays(plan).length;
}
/**
 * Get a specific day by day number (1-based)
 */
export function getNutritionPlanDay(plan, dayNumber) {
    const days = getAllNutritionPlanDays(plan);
    return days.find((d) => d.dayNumber === dayNumber) || null;
}
/**
 * Get a specific day by week and day number
 */
export function getNutritionPlanDayByWeek(plan, weekNumber, dayNumber) {
    const week = plan.weeks?.find((w) => w.weekNumber === weekNumber);
    if (!week) {
        return null;
    }
    return week.days?.find((d) => d.dayNumber === dayNumber) || null;
}
/**
 * Get week by week number
 */
export function getNutritionPlanWeek(plan, weekNumber) {
    return plan.weeks?.find((w) => w.weekNumber === weekNumber) || null;
}
/**
 * Iterate over all weeks in a plan
 */
export function* iterateNutritionPlanWeeks(plan) {
    if (!plan.weeks) {
        return;
    }
    for (const week of plan.weeks) {
        yield week;
    }
}
/**
 * Iterate over all days in a plan (across all weeks)
 */
export function* iterateNutritionPlanDays(plan) {
    if (!plan.weeks) {
        return;
    }
    for (const week of plan.weeks) {
        if (week.days) {
            for (const day of week.days) {
                yield day;
            }
        }
    }
}
import { getWeekAndDayFromDate as getWeekAndDayFromDateGeneric } from './plan-helpers';
/**
 * Determine week and day number from date
 *
 * Calculates which day of the nutrition plan should be displayed based on the target date.
 * The plan cycles through all days, repeating from the beginning when the cycle completes.
 *
 * @param plan - The nutrition plan
 * @param targetDate - The target date to calculate the day for
 * @returns Object with weekNumber and dayNumber, or null if plan has no weeks
 */
export function getWeekAndDayFromDate(plan, targetDate) {
    return getWeekAndDayFromDateGeneric(plan, targetDate);
}
