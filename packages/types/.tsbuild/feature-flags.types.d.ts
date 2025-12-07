/**
 * Feature Flags Types
 *
 * Type definitions for the feature flags system
 */
/**
 * Rollout strategy types for feature flags
 */
export type RolloutStrategy = 'ALL' | 'ROLE_BASED' | 'PERCENTAGE' | 'RANDOM' | 'BETA_USERS' | 'COMBINED';
/**
 * Feature flag event types for metrics tracking
 */
export type FlagEventType = 'ENABLED' | 'DISABLED' | 'EVALUATED' | 'ERROR';
/**
 * Rollout configuration interface
 */
export interface RolloutConfig {
    roles?: string[];
    percentage?: number;
    betaOnly?: boolean;
}
/**
 * Feature flag definition
 */
export interface FeatureFlag {
    id: string;
    key: string;
    name: string;
    description?: string | null;
    enabled: boolean;
    strategy: RolloutStrategy;
    config?: RolloutConfig;
    metadata?: Record<string, unknown>;
    createdBy: string;
    updatedBy?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Feature flag metrics event
 */
export interface FeatureFlagMetric {
    id: string;
    flagKey: string;
    userId?: string | null;
    event: FlagEventType;
    value?: boolean | null;
    metadata?: Record<string, unknown>;
    timestamp: Date;
}
/**
 * Feature flag feedback
 */
export interface FeatureFlagFeedback {
    id: string;
    flagKey: string;
    userId: string;
    rating: number;
    comment?: string | null;
    metadata?: Record<string, unknown>;
    createdAt: Date;
}
