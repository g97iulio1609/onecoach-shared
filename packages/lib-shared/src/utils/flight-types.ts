/**
 * Flight Types - Single Source of Truth
 *
 * Shared types for the OneFlight feature.
 * Import from @onecoach/lib-shared/utils/flight-types
 *
 * @module flight-types
 */

// ============================================================================
// Flight Result Types
// ============================================================================

/** Layover information for multi-segment flights */
export interface FlightLayover {
  city: string;
  code: string;
  durationInSeconds: number;
  arrival?: { utc: string; local: string };
  departure?: { utc: string; local: string };
}

/** Core flight result from search API */
export interface FlightResult {
  id?: string;
  flyFrom: string;
  flyTo: string;
  cityFrom: string;
  cityTo: string;
  departure: { utc: string; local: string };
  arrival: { utc: string; local: string };
  totalDurationInSeconds: number;
  price: number;
  deepLink: string;
  isDeal?: boolean;
  savingsAmount?: number;
  layovers?: FlightLayover[];
  direction?: FlightDirection;
}

// ============================================================================
// Flight Direction & Response Types
// ============================================================================

/** Flight direction for round-trip legs */
export type FlightDirection = 'outbound' | 'return';

/** Deal strategy types */
export type DealStrategy = 'standard' | 'one-way-combo' | 'hidden-city' | 'flexible-dates';

/** Extended Flight interface with deal strategy for UI */
export interface Flight extends FlightResult {
  dealStrategy?: DealStrategy;
}

/** Round-trip search result */
export interface RoundTripSearchResult {
  tripType: 'round-trip';
  outbound: FlightResult[];
  return: FlightResult[];
}

/** One-way search result */
export interface OneWaySearchResult {
  tripType: 'one-way';
  flights: FlightResult[];
}

/** Discriminated union for flight search results */
export type FlightSearchResponse = RoundTripSearchResult | OneWaySearchResult;

// ============================================================================
// Search Input
// ============================================================================

/** Flight search input parameters */
export interface FlightSearchInput {
  flyFrom: string[];
  flyTo: string[];
  departureDate: string;
  returnDate?: string | null;
  passengers?: { adults: number; children?: number; infants?: number };
  cabinClass?: string;
}

// ============================================================================
// Type Guards & Utilities
// ============================================================================

/** Type guard for round-trip search results */
export function isRoundTrip(response: FlightSearchResponse): response is RoundTripSearchResult {
  return response.tripType === 'round-trip';
}

/** Type guard for one-way search results */
export function isOneWay(response: FlightSearchResponse): response is OneWaySearchResult {
  return response.tripType === 'one-way';
}

/** Get all flights from a search response regardless of trip type */
export function getAllFlights(response: FlightSearchResponse): FlightResult[] {
  return isRoundTrip(response) ? [...response.outbound, ...response.return] : response.flights;
}
