/**
 * Health Integration Configuration
 */
export type HealthDataType = 'steps' | 'heartRate' | 'activeCalories' | 'weight' | 'workout';
export declare const AUTO_SYNC_INTERVAL: number;
export declare const DEFAULT_SYNC_DAYS = 7;
export declare const HEALTH_DATA_TYPES: HealthDataType[];
export declare const APPLE_HEALTH_PERMISSIONS: {
    permissions: {
        read: string[];
        write: never[];
    };
};
export declare const ANDROID_HEALTH_PERMISSIONS: {
    accessType: string;
    recordType: string;
}[];
export declare const WORKOUT_ACTIVITY_TYPES: {
    readonly ios: {
        readonly 1: "Running";
        readonly 2: "Cycling";
        readonly 3: "Swimming";
        readonly 4: "Walking";
        readonly 5: "Yoga";
        readonly 6: "Strength Training";
        readonly 7: "Cardio";
        readonly 8: "HIIT";
    };
    readonly android: {
        readonly 1: "RUNNING";
        readonly 2: "BIKING";
        readonly 3: "SWIMMING";
        readonly 4: "WALKING";
        readonly 5: "YOGA";
        readonly 6: "STRENGTH_TRAINING";
        readonly 7: "CARDIO";
        readonly 8: "HIGH_INTENSITY_INTERVAL_TRAINING";
    };
};
export declare const HEALTH_ENDPOINTS: {
    readonly SYNC_DATA: "/api/health/sync";
    readonly GET_SUMMARY: "/api/health/summary";
    readonly GET_DATA: "/api/health/data";
};
export declare const HEALTH_STORAGE_KEYS: {
    readonly LAST_SYNC_TIME: "@health/lastSyncTime";
    readonly AUTO_SYNC_ENABLED: "@health/autoSyncEnabled";
    readonly PERMISSIONS_GRANTED: "@health/permissionsGranted";
};
