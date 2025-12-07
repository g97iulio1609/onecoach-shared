/**
 * Platform-agnostic Drag and Drop Helper Utilities
 *
 * These pure functions handle array reordering and moving items between lists.
 * They are completely independent of any drag and drop library and can be
 * used in both web (React) and mobile (React Native) contexts.
 */
// ============================================================================
// Generic Array Reordering
// ============================================================================
/**
 * Reorder items within the same array (immutable)
 *
 * @example
 * reorderArray({ items: [1, 2, 3], sourceIndex: 0, destinationIndex: 2 })
 * // Returns: { items: [2, 3, 1] }
 */
export function reorderArray(operation) {
    const { items, sourceIndex, destinationIndex } = operation;
    // Validation: Check for null/undefined
    if (!items) {
        throw new Error('Items array cannot be null or undefined');
    }
    // Validation: Check for empty array
    if (items.length === 0) {
        throw new Error('Cannot reorder empty array');
    }
    // Validation: Check for NaN indices
    if (isNaN(sourceIndex) || isNaN(destinationIndex)) {
        throw new Error(`Invalid indices: sourceIndex=${sourceIndex}, destinationIndex=${destinationIndex}`);
    }
    // Validation: Check for valid range
    if (sourceIndex < 0 || sourceIndex >= items.length) {
        throw new Error(`Invalid sourceIndex: ${sourceIndex} for array of length ${items.length}`);
    }
    if (destinationIndex < 0 || destinationIndex >= items.length) {
        throw new Error(`Invalid destinationIndex: ${destinationIndex} for array of length ${items.length}`);
    }
    // No-op if same position
    if (sourceIndex === destinationIndex) {
        return { items };
    }
    // Create a copy and reorder
    const result = Array.from(items);
    const [removed] = result.splice(sourceIndex, 1);
    if (removed === undefined) {
        return { items: result };
    }
    result.splice(destinationIndex, 0, removed);
    return { items: result };
}
/**
 * Move an item from one array to another (immutable)
 *
 * @example
 * moveItemBetweenArrays({
 *   sourceList: [1, 2, 3],
 *   destinationList: [4, 5],
 *   sourceIndex: 0,
 *   destinationIndex: 1
 * })
 * // Returns: {
 * //   sourceList: [2, 3],
 * //   destinationList: [4, 1, 5],
 * //   movedItem: 1
 * // }
 */
export function moveItemBetweenArrays(operation) {
    const { sourceList, destinationList, sourceIndex, destinationIndex } = operation;
    // Validation: Check for null/undefined
    if (!sourceList || !destinationList) {
        throw new Error('Source and destination lists cannot be null or undefined');
    }
    // Validation: Check for empty source array
    if (sourceList.length === 0) {
        throw new Error('Cannot move item from empty source array');
    }
    // Validation: Check for NaN indices
    if (isNaN(sourceIndex) || isNaN(destinationIndex)) {
        throw new Error(`Invalid indices: sourceIndex=${sourceIndex}, destinationIndex=${destinationIndex}`);
    }
    // Validation: Check for valid range
    if (sourceIndex < 0 || sourceIndex >= sourceList.length) {
        throw new Error(`Invalid sourceIndex: ${sourceIndex} for source array of length ${sourceList.length}`);
    }
    // Note: destinationIndex can be equal to destinationList.length (append to end)
    if (destinationIndex < 0 || destinationIndex > destinationList.length) {
        throw new Error(`Invalid destinationIndex: ${destinationIndex} for destination array of length ${destinationList.length}`);
    }
    // Create copies
    const newSourceList = Array.from(sourceList);
    const newDestinationList = Array.from(destinationList);
    // Remove from source
    const [removed] = newSourceList.splice(sourceIndex, 1);
    if (removed === undefined) {
        return {
            sourceList: newSourceList,
            destinationList: newDestinationList,
            movedItem: undefined,
        };
    }
    // Add to destination
    newDestinationList.splice(destinationIndex, 0, removed);
    return {
        sourceList: newSourceList,
        destinationList: newDestinationList,
        movedItem: removed,
    };
}
// ============================================================================
// Drag ID Utilities
// ============================================================================
/**
 * Create a unique drag ID for a food item
 */
export function createFoodDragId(dayNumber, mealId, foodId) {
    return `food-${dayNumber}-${mealId}-${foodId}`;
}
/**
 * Parse a food drag ID
 */
export function parseFoodDragId(dragId) {
    const match = dragId.match(/^food-(\d+)-(.+)-(.+)$/);
    if (!match || !match[1] || !match[2] || !match[3])
        return null;
    return {
        dayNumber: parseInt(match[1], 10),
        mealId: match[2],
        foodId: match[3],
    };
}
/**
 * Create a unique drag ID for a meal
 */
export function createMealDragId(dayNumber, mealId) {
    return `meal-${dayNumber}-${mealId}`;
}
/**
 * Parse a meal drag ID
 */
export function parseMealDragId(dragId) {
    const match = dragId.match(/^meal-(\d+)-(.+)$/);
    if (!match || !match[1] || !match[2])
        return null;
    return {
        dayNumber: parseInt(match[1], 10),
        mealId: match[2],
    };
}
/**
 * Create a unique drag ID for a nutrition day
 */
export function createNutritionDayDragId(weekNumber, dayNumber) {
    return `nutrition-day-${weekNumber}-${dayNumber}`;
}
/**
 * Parse a nutrition day drag ID
 */
export function parseNutritionDayDragId(dragId) {
    const match = dragId.match(/^nutrition-day-(\d+)-(\d+)$/);
    if (!match || !match[1] || !match[2])
        return null;
    return {
        weekNumber: parseInt(match[1], 10),
        dayNumber: parseInt(match[2], 10),
    };
}
/**
 * Create a unique drag ID for a nutrition week
 */
export function createNutritionWeekDragId(weekNumber) {
    return `nutrition-week-${weekNumber}`;
}
/**
 * Parse a nutrition week drag ID
 */
export function parseNutritionWeekDragId(dragId) {
    const match = dragId.match(/^nutrition-week-(\d+)$/);
    if (!match || !match[1])
        return null;
    return {
        weekNumber: parseInt(match[1], 10),
    };
}
/**
 * Create a unique drag ID for a workout exercise
 */
export function createExerciseDragId(weekNumber, dayNumber, exerciseId) {
    return `exercise-${weekNumber}-${dayNumber}-${exerciseId}`;
}
/**
 * Parse an exercise drag ID
 */
export function parseExerciseDragId(dragId) {
    const match = dragId.match(/^exercise-(\d+)-(\d+)-(.+)$/);
    if (!match || !match[1] || !match[2] || !match[3])
        return null;
    return {
        weekNumber: parseInt(match[1], 10),
        dayNumber: parseInt(match[2], 10),
        exerciseId: match[3],
    };
}
/**
 * Create a unique drag ID for a workout day
 */
export function createWorkoutDayDragId(weekNumber, dayNumber) {
    return `workout-day-${weekNumber}-${dayNumber}`;
}
/**
 * Parse a workout day drag ID
 */
export function parseWorkoutDayDragId(dragId) {
    const match = dragId.match(/^workout-day-(\d+)-(\d+)$/);
    if (!match || !match[1] || !match[2])
        return null;
    return {
        weekNumber: parseInt(match[1], 10),
        dayNumber: parseInt(match[2], 10),
    };
}
/**
 * Create a unique drag ID for a workout week
 */
export function createWorkoutWeekDragId(weekNumber) {
    return `workout-week-${weekNumber}`;
}
/**
 * Parse a workout week drag ID
 */
export function parseWorkoutWeekDragId(dragId) {
    const match = dragId.match(/^workout-week-(\d+)$/);
    if (!match || !match[1])
        return null;
    return {
        weekNumber: parseInt(match[1], 10),
    };
}
// ============================================================================
// Drop Zone ID Utilities
// ============================================================================
/**
 * Create a drop zone ID for a meal (to receive foods)
 */
export function createMealDropZoneId(dayNumber, mealId) {
    return `meal-dropzone-${dayNumber}-${mealId}`;
}
/**
 * Create a drop zone ID for a day (to receive meals)
 */
export function createDayDropZoneId(dayNumber) {
    return `day-dropzone-${dayNumber}`;
}
/**
 * Create a drop zone ID for a nutrition week (to receive days)
 */
export function createNutritionWeekDropZoneId(weekNumber) {
    return `nutrition-week-dropzone-${weekNumber}`;
}
/**
 * Create a drop zone ID for a workout day (to receive exercises)
 */
export function createWorkoutDayDropZoneId(weekNumber, dayNumber) {
    return `workout-day-dropzone-${weekNumber}-${dayNumber}`;
}
/**
 * Create a drop zone ID for a workout week (to receive days)
 */
export function createWorkoutWeekDropZoneId(weekNumber) {
    return `workout-week-dropzone-${weekNumber}`;
}
// ============================================================================
// Validation Utilities
// ============================================================================
/**
 * Check if two drag IDs are of the same type
 */
export function isSameDragType(dragId1, dragId2) {
    const type1 = dragId1.split('-')[0];
    const type2 = dragId2.split('-')[0];
    return type1 === type2;
}
/**
 * Extract drag type from drag ID
 */
export function getDragType(dragId) {
    const parts = dragId.split('-');
    const type = parts[0];
    if (!type) {
        return '';
    }
    return type;
}
/**
 * Check if a drag ID represents a nutrition food
 */
export function isFoodDragId(dragId) {
    return dragId.startsWith('food-');
}
/**
 * Check if a drag ID represents a nutrition meal
 */
export function isMealDragId(dragId) {
    return dragId.startsWith('meal-');
}
/**
 * Check if a drag ID represents a nutrition day
 */
export function isNutritionDayDragId(dragId) {
    return dragId.startsWith('nutrition-day-');
}
/**
 * Check if a drag ID represents a nutrition week
 */
export function isNutritionWeekDragId(dragId) {
    return dragId.startsWith('nutrition-week-');
}
/**
 * Check if a drag ID represents a workout exercise
 */
export function isExerciseDragId(dragId) {
    return dragId.startsWith('exercise-');
}
/**
 * Check if a drag ID represents a workout day
 */
export function isWorkoutDayDragId(dragId) {
    return dragId.startsWith('workout-day-');
}
/**
 * Check if a drag ID represents a workout week
 */
export function isWorkoutWeekDragId(dragId) {
    return dragId.startsWith('workout-week-');
}
