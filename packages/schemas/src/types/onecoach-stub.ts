// Stub module for external @OneCoach/* deps not present in shared workspace
const anyModule: any = new Proxy(
  {},
  {
    get: () => anyModule,
    apply: () => anyModule,
  }
);

export default anyModule;
export const getAIProviderKey = anyModule;
export const getOpenRouterConfig = anyModule;
export const MacroValidationService = anyModule;
export const getBodyMetricsTimeSeries = anyModule;
export const getBodyMetricsChange = anyModule;
export const getWorkoutVolumeTimeSeries = anyModule;
export const getStrengthProgress = anyModule;
export const calculateWorkoutMetrics = anyModule;
export const calculateNutritionAdherence = anyModule;
export const getNutritionMacrosTimeSeries = anyModule;
export const generateAnalyticsReport = anyModule;
export const getBodyMeasurementHistory = anyModule;
export const getLatestBodyMeasurement = anyModule;
export const getProgressSnapshots = anyModule;
export const getLatestProgressSnapshot = anyModule;
export const ExerciseAdminService = anyModule;
export const ExerciseService = anyModule;
export const creditService = anyModule;
export const OperationType = anyModule;
export const DifficultyLevel = anyModule;
export const WorkoutStatus = anyModule;
export const NutritionStatus = anyModule;
export const CalendarPlanType = anyModule;
export const DietType = anyModule;
export const AffiliateRewardType = anyModule;
export const AffiliateRewardStatus = anyModule;
export const ReferralAttributionStatus = anyModule;
export const ExerciseApprovalStatus = anyModule;
export const MuscleRole = anyModule;
export const PolicyType = anyModule;
export const PolicyStatus = anyModule;
export const PromotionType = anyModule;
export const DiscountType = anyModule;
export const MarketplacePlanType = anyModule;
export const PlanningStatus = anyModule;
export const PlanningAgentType = anyModule;
export const CoachVerificationStatus = anyModule;
export const VettingStatus = anyModule;
export const PurchaseStatus = anyModule;
export const ExerciseRelationType = anyModule;
export const WorkoutTemplateType = anyModule;
export const TemplateType = anyModule;
export const Prisma = anyModule;
export const AI_REASONING_CONFIG = anyModule;
export const USER_METRICS_CONSTANTS = anyModule;
export const VALIDATION_CONSTANTS = anyModule;
