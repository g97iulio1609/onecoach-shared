/**
 * Common Types
 *
 * Type definitions comuni utilizzate in tutta l'applicazione
 */
/**
 * Status per entità
 */
export type Status = 'active' | 'completed' | 'archived' | 'draft';
/**
 * Base entity con campi comuni
 */
export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
}
/**
 * Generic API Response
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
/**
 * Pagination
 */
export interface Pagination {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}
/**
 * Filter base
 */
export interface BaseFilter {
    search?: string;
    status?: Status;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
/**
 * Result con paginazione
 */
export interface PaginatedResult<T> {
    items: T[];
    pagination: Pagination;
}
/**
 * Metadata generico per operazioni API
 */
export interface OperationMetadata {
    provider: string;
    model: string;
    steps: number;
    executionTime: number;
    creditsUsed: number;
}
/**
 * Risultato di operazione generico con tipizzazione forte
 */
export interface OperationResult<T = unknown> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
    metadata: OperationMetadata;
}
/**
 * Configurazioni JSON per Prisma con tipizzazione forte
 */
export type JsonConfig = Record<string, unknown> & {
    [key: string]: string | number | boolean | null | JsonConfig | unknown[];
};
/**
 * Contesto generico per execution context
 */
export interface ExecutionContext {
    userId: string;
    sessionId?: string;
    metadata?: Record<string, unknown>;
    timestamp: string;
}
/**
 * Filtro per query database con tipizzazione generica
 */
export interface DatabaseFilter<T = Record<string, unknown>> {
    where?: Partial<T>;
    orderBy?: {
        field: keyof T;
        order: 'asc' | 'desc';
    };
    limit?: number;
    offset?: number;
}
/**
 * Opzioni di paginazione standard
 */
export interface PaginationOptions {
    page: number;
    pageSize: number;
}
/**
 * Tipi di errore comuni
 */
export interface ErrorDetails {
    field?: string;
    code?: string;
    message?: string;
    value?: unknown;
}
/**
 * Statistiche operative
 */
export interface OperationStats {
    totalOperations: number;
    successfulOperations: number;
    failedOperations: number;
    averageExecutionTime: number;
    totalCreditsUsed: number;
}
/**
 * Chiavi di configurazione fortemente tipizzate
 */
export type ConfigKey = 'consensus_system' | 'skills_system' | 'learning_feedback_loop' | 'intelligent_mode_selection' | 'auto_decomposition' | 'adaptive_recovery' | 'cost_monitoring' | 'orchestration_tracing';
/**
 * Type guard per verificare se un valore è JsonConfig
 */
export declare function isJsonConfig(value: unknown): value is JsonConfig;
/**
 * Type guard per verificare se un valore è ErrorDetails
 */
export declare function isErrorDetails(value: unknown): value is ErrorDetails;
/**
 * Crea un OperationResult con tipizzazione forte
 */
export declare function createOperationResult<T>(success: boolean, metadata: OperationMetadata, data?: T, error?: {
    code: string;
    message: string;
    details?: unknown;
}): OperationResult<T>;
