/**
 * Workout Service Contract
 *
 * Interfaccia per il servizio workout
 * UNICA FONTE DI VERITÀ per il contratto del servizio
 */
import type { WorkoutProgram, ApiResponse } from '@onecoach/types';
export interface IWorkoutService {
    create(workout: Omit<WorkoutProgram, 'id' | 'createdAt' | 'updatedAt'>): ApiResponse<WorkoutProgram>;
    update(id: string, workout: Partial<WorkoutProgram>): ApiResponse<WorkoutProgram>;
    delete(id: string): ApiResponse<void>;
    get(id: string): ApiResponse<WorkoutProgram>;
    getAll(): ApiResponse<WorkoutProgram[]>;
    getByStatus(status: WorkoutProgram['status']): ApiResponse<WorkoutProgram[]>;
}
//# sourceMappingURL=workout.service.contract.d.ts.map