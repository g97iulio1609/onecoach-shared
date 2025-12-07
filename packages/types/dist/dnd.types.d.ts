/**
 * Platform-agnostic Drag and Drop Types
 *
 * This abstraction layer allows for easy replacement of the underlying
 * drag and drop implementation (e.g., switching from @dnd-kit to React Native's
 * gesture handlers in the future).
 */
/**
 * Represents the type of item being dragged
 */
export type DraggableType = 'nutrition-food' | 'nutrition-meal' | 'nutrition-day' | 'nutrition-week' | 'workout-exercise' | 'workout-day' | 'workout-week';
/**
 * Metadata attached to a draggable item
 */
export interface DraggableData {
    type: DraggableType;
    id: string;
    weekNumber?: number;
    dayNumber?: number;
    mealId?: string;
    foodId?: string;
    exerciseId?: string;
    sourceContext?: DragContext;
}
/**
 * Context information for drag operations
 */
export interface DragContext {
    weekNumber?: number;
    dayNumber?: number;
    mealId?: string;
}
/**
 * Result of a drag operation
 */
export interface DragResult {
    source: DragLocation;
    destination: DragLocation | null;
    draggableId: string;
    type: DraggableType;
}
/**
 * Location of an item in the hierarchy
 */
export interface DragLocation {
    weekNumber?: number;
    dayNumber?: number;
    mealId?: string;
    index: number;
}
/**
 * Visual states for drag and drop
 */
export type DragVisualState = 'idle' | 'dragging' | 'over' | 'invalid';
/**
 * Configuration for drag visual feedback
 */
export interface DragVisualConfig {
    showGhost?: boolean;
    ghostOpacity?: number;
    highlightDropZone?: boolean;
    showInvalidDropZone?: boolean;
    animationDuration?: number;
}
/**
 * Generic reorder operation within the same list
 */
export interface ReorderOperation<T> {
    items: T[];
    sourceIndex: number;
    destinationIndex: number;
}
/**
 * Generic move operation between different lists
 */
export interface MoveOperation<T> {
    sourceList: T[];
    destinationList: T[];
    sourceIndex: number;
    destinationIndex: number;
}
/**
 * Result of a reorder operation
 */
export interface ReorderResult<T> {
    items: T[];
}
/**
 * Result of a move operation
 */
export interface MoveResult<T> {
    sourceList: T[];
    destinationList: T[];
    movedItem: T;
}
/**
 * Nutrition food drag operation
 */
export interface FoodDragOperation {
    foodId: string;
    sourceDayNumber: number;
    sourceMealId: string;
    sourceIndex: number;
    destinationDayNumber: number;
    destinationMealId: string;
    destinationIndex: number;
}
/**
 * Nutrition meal drag operation
 */
export interface MealDragOperation {
    mealId: string;
    sourceDayNumber: number;
    sourceIndex: number;
    destinationDayNumber: number;
    destinationIndex: number;
}
/**
 * Nutrition day drag operation
 */
export interface DayDragOperation {
    dayNumber: number;
    sourceWeekNumber: number;
    sourceIndex: number;
    destinationWeekNumber: number;
    destinationIndex: number;
}
/**
 * Nutrition week drag operation
 */
export interface WeekDragOperation {
    weekNumber: number;
    sourceIndex: number;
    destinationIndex: number;
}
/**
 * Workout exercise drag operation
 */
export interface ExerciseDragOperation {
    exerciseId: string;
    sourceWeekNumber: number;
    sourceDayNumber: number;
    sourceIndex: number;
    destinationWeekNumber: number;
    destinationDayNumber: number;
    destinationIndex: number;
}
/**
 * Workout day drag operation
 */
export interface WorkoutDayDragOperation {
    dayNumber: number;
    sourceWeekNumber: number;
    sourceIndex: number;
    destinationWeekNumber: number;
    destinationIndex: number;
}
/**
 * Workout week drag operation
 */
export interface WorkoutWeekDragOperation {
    weekNumber: number;
    sourceIndex: number;
    destinationIndex: number;
}
/**
 * Generic drag end handler
 */
export type DragEndHandler = (result: DragResult) => void;
/**
 * Nutrition-specific drag handlers
 */
export interface NutritionDragHandlers {
    onFoodDrag: (operation: FoodDragOperation) => void;
    onMealDrag: (operation: MealDragOperation) => void;
    onDayDrag: (operation: DayDragOperation) => void;
    onWeekDrag: (operation: WeekDragOperation) => void;
}
/**
 * Workout-specific drag handlers
 */
export interface WorkoutDragHandlers {
    onExerciseDrag: (operation: ExerciseDragOperation) => void;
    onDayDrag: (operation: WorkoutDayDragOperation) => void;
    onWeekDrag: (operation: WorkoutWeekDragOperation) => void;
}
/**
 * Configuration for touch sensors
 */
export interface TouchSensorConfig {
    activationDelay?: number;
    activationTolerance?: number;
}
/**
 * Configuration for mouse sensors
 */
export interface MouseSensorConfig {
    activationConstraint?: {
        distance?: number;
    };
}
/**
 * Configuration for keyboard sensors
 */
export interface KeyboardSensorConfig {
    scrollBehavior?: 'auto' | 'smooth';
}
/**
 * Overall sensor configuration
 */
export interface SensorConfig {
    touch?: TouchSensorConfig;
    mouse?: MouseSensorConfig;
    keyboard?: KeyboardSensorConfig;
}
