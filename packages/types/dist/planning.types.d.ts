/**
 * Planning System Types
 *
 * Type definitions per sistema di pianificazione multi-task
 */
/**
 * Status di un task o sub-task
 */
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'failed';
/**
 * Sub-sub-task per pasto (singolo pasto in un giorno)
 */
export interface PlanningSubSubTask {
    id: string;
    mealNumber: number;
    mealName?: string;
    mealType?: string;
    status: TaskStatus;
    result?: unknown;
    error?: string;
    startedAt?: Date;
    completedAt?: Date;
}
/**
 * Sub-task per giorno (singolo giorno di allenamento/pasto)
 */
export interface PlanningSubTask {
    id: string;
    dayNumber: number;
    dayName: string;
    status: TaskStatus;
    result?: unknown;
    error?: string;
    startedAt?: Date;
    completedAt?: Date;
    subSubTasks?: PlanningSubSubTask[];
}
/**
 * Task per settimana (contiene sub-task per ogni giorno)
 */
export interface PlanningTask {
    id: string;
    weekNumber: number;
    status: TaskStatus;
    subTasks: PlanningSubTask[];
    result?: unknown;
    error?: string;
    startedAt?: Date;
    completedAt?: Date;
}
/**
 * Piano di lavoro completo con task e sub-task
 */
export interface PlanningPlan {
    id: string;
    agentType: 'workout' | 'nutrition';
    durationWeeks: number;
    daysPerWeek: number;
    tasks: PlanningTask[];
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
    metadata?: Record<string, unknown>;
}
/**
 * Progress di un piano di lavoro
 */
export interface PlanningProgress {
    planId: string;
    planStatus?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'PAUSED';
    totalTasks: number;
    completedTasks: number;
    totalSubTasks: number;
    completedSubTasks: number;
    tasks?: PlanningTask[];
    currentTask?: PlanningTask;
    currentSubTask?: PlanningSubTask;
    progressPercentage: number;
}
/**
 * Parametri per creare un piano
 */
export interface PlanningPlanParams {
    agentType: 'workout' | 'nutrition';
    durationWeeks: number;
    daysPerWeek: number;
    metadata?: Record<string, unknown>;
}
/**
 * Risultato di esecuzione di un task
 */
export interface TaskExecutionResult {
    taskId: string;
    subTaskId?: string;
    success: boolean;
    result?: unknown;
    error?: string;
}
