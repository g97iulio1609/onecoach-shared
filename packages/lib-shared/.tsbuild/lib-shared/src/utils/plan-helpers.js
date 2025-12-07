/**
 * Generic Plan Helpers
 *
 * Shared utilities for plans with weeks and days structure (NutritionPlan, WorkoutProgram)
 * Following DRY and SOLID principles
 */
/**
 * Get total number of days in a plan
 */
function getTotalDays(plan) {
    if (!plan.weeks || plan.weeks.length === 0) {
        return 0;
    }
    return plan.weeks.reduce((total, week) => total + (week.days?.length || 0), 0);
}
/**
 * Determine week and day number from date (generic implementation)
 *
 * Calculates which day of the plan should be displayed based on the target date.
 * The plan cycles through all days, repeating from the beginning when the cycle completes.
 *
 * @param plan - The plan with weeks structure
 * @param targetDate - The target date to calculate the day for
 * @returns Object with weekNumber and dayNumber, or null if plan has no weeks
 */
export function getWeekAndDayFromDate(plan, targetDate) {
    if (!plan.weeks || plan.weeks.length === 0)
        return null;
    const daysFromStart = Math.floor((targetDate.getTime() - new Date(plan.createdAt || Date.now()).getTime()) /
        (1000 * 60 * 60 * 24));
    const totalDays = getTotalDays(plan);
    if (totalDays === 0) {
        const firstWeek = plan.weeks[0];
        if (!firstWeek)
            return null;
        const firstDay = firstWeek.days?.[0];
        return {
            weekNumber: firstWeek.weekNumber,
            dayNumber: firstDay?.dayNumber || 1,
        };
    }
    const dayIndex = ((daysFromStart % totalDays) + totalDays) % totalDays;
    let currentDayIndex = 0;
    for (const week of plan.weeks) {
        for (const day of week.days || []) {
            if (currentDayIndex === dayIndex) {
                return {
                    weekNumber: week.weekNumber,
                    dayNumber: day.dayNumber,
                };
            }
            currentDayIndex++;
        }
    }
    const firstWeek = plan.weeks[0];
    if (!firstWeek)
        return null;
    const firstDay = firstWeek.days?.[0];
    return {
        weekNumber: firstWeek.weekNumber,
        dayNumber: firstDay?.dayNumber || 1,
    };
}
