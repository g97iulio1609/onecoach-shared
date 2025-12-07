/**
 * Supported Locales for Food Items
 *
 * List of all languages that must have translations for food items.
 * When creating a new food item, translations MUST be created for ALL these locales.
 */
export declare const SUPPORTED_FOOD_LOCALES: readonly ["en", "it", "es", "fr", "de", "pt", "nl", "pl", "ja", "zh"];
export type SupportedFoodLocale = (typeof SUPPORTED_FOOD_LOCALES)[number];
/**
 * Locale names in their native language
 */
export declare const LOCALE_NAMES: Record<SupportedFoodLocale, string>;
/**
 * Default locale for food items (always English)
 */
export declare const DEFAULT_FOOD_LOCALE: SupportedFoodLocale;
/**
 * Validate if a locale is supported
 */
export declare function isSupportedFoodLocale(locale: string): locale is SupportedFoodLocale;
/**
 * Get all supported locales as array
 */
export declare function getAllSupportedFoodLocales(): readonly SupportedFoodLocale[];
