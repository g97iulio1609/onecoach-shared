/**
 * API Types
 *
 * Type definitions per API routes e requests/responses
 */
import type { ApiResponse } from './common.types';
import type { AiRequest, AiResponse } from './chat.types';
import type { WorkoutProgram } from './workout.types';
import type { NutritionPlan } from './nutrition.types';
/**
 * API Error
 */
export interface ApiError {
    code: string;
    message: string;
    details?: unknown;
    timestamp: string;
}
/**
 * Chat API Request
 */
export interface ChatApiRequest {
    request: AiRequest;
}
/**
 * Chat API Response
 */
export interface ChatApiResponse {
    success: boolean;
    data?: AiResponse;
    error?: ApiError;
    message?: string;
}
/**
 * CRUD Operations
 */
export interface CreateRequest<T> {
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
}
export interface UpdateRequest<T> {
    id: string;
    data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;
}
export interface DeleteRequest {
    id: string;
}
export interface GetRequest {
    id: string;
}
export interface ListRequest {
    page?: number;
    pageSize?: number;
    filter?: Record<string, unknown>;
    sort?: {
        field: string;
        order: 'asc' | 'desc';
    };
}
/**
 * Workout API Types
 */
export type CreateWorkoutRequest = CreateRequest<WorkoutProgram>;
export type UpdateWorkoutRequest = UpdateRequest<WorkoutProgram>;
export type WorkoutApiResponse = ApiResponse<WorkoutProgram>;
export type WorkoutListApiResponse = ApiResponse<WorkoutProgram[]>;
/**
 * Nutrition API Types
 */
export type CreateNutritionRequest = CreateRequest<NutritionPlan>;
export type UpdateNutritionRequest = UpdateRequest<NutritionPlan>;
export type NutritionApiResponse = ApiResponse<NutritionPlan>;
export type NutritionListApiResponse = ApiResponse<NutritionPlan[]>;
/**
 * Health Check Response
 */
export interface HealthCheckResponse extends ApiResponse {
    version: string;
    uptime: number;
    timestamp: string;
}
