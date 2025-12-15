/**
 * In-App Purchase Configuration
 * Product IDs must match exactly with App Store Connect and Google Play Console
 */
/**
 * Product ID type
 */
export type ProductId = 'coach_one_pro_monthly' | 'coach_one_pro_yearly' | 'coach_one_coach_monthly' | 'coach_one_coach_yearly';
/**
 * Product IDs for iOS and Android
 * IMPORTANT: These must be configured in:
 * - App Store Connect (iOS)
 * - Google Play Console (Android)
 */
export declare const PRODUCT_IDS: Record<string, ProductId>;
/**
 * All subscription product IDs
 */
export declare const ALL_PRODUCT_IDS: ProductId[];
/**
 * Product mapping to internal plan IDs
 */
export declare const PRODUCT_TO_PLAN_MAP: {
    readonly coach_one_pro_monthly: {
        readonly planId: "pro";
        readonly cycle: "monthly";
    };
    readonly coach_one_pro_yearly: {
        readonly planId: "pro";
        readonly cycle: "yearly";
    };
    readonly coach_one_coach_monthly: {
        readonly planId: "coach";
        readonly cycle: "monthly";
    };
    readonly coach_one_coach_yearly: {
        readonly planId: "coach";
        readonly cycle: "yearly";
    };
};
/**
 * Shared secret for iOS receipt validation
 * Should be stored in environment variables
 */
export declare const IOS_SHARED_SECRET: string;
/**
 * Google Play public key for Android receipt validation
 * Should be stored in environment variables
 */
export declare const ANDROID_PUBLIC_KEY: string;
/**
 * Backend API endpoints for IAP
 */
export declare const IAP_ENDPOINTS: {
    readonly VERIFY_RECEIPT: "/api/iap/verify-receipt";
    readonly SYNC_SUBSCRIPTION: "/api/iap/sync-subscription";
    readonly RESTORE_PURCHASES: "/api/iap/restore-purchases";
    readonly GET_SUBSCRIPTION_STATUS: "/api/iap/subscription-status";
};
//# sourceMappingURL=iap.config.d.ts.map