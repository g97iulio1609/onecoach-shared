/**
 * Authentication Types
 *
 * Type definitions per NextAuth e autenticazione
 */
import type { UserRole, SafeUser } from './database.types';
/**
 * Session User
 * Informazioni utente nella sessione
 */
export interface SessionUser {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
    credits: number;
    image: string | null;
}
/**
 * Login Credentials
 */
export interface LoginCredentials {
    email: string;
    password: string;
}
/**
 * Register Data
 */
export interface RegisterData {
    email: string;
    password: string;
    name?: string;
    referralCode?: string;
    privacyConsent?: boolean;
    termsConsent?: boolean;
}
/**
 * Auth Response
 */
export interface AuthResponse {
    success: boolean;
    message?: string;
    user?: SafeUser;
    error?: string;
}
/**
 * Password Reset Request
 */
export interface PasswordResetRequest {
    email: string;
}
/**
 * Password Reset Confirmation
 */
export interface PasswordResetConfirmation {
    token: string;
    password: string;
}
/**
 * Change Password
 */
export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}
export type AppUserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN' | 'COACH';
export declare const ADMIN_ROLES: ReadonlyArray<AppUserRole>;
/**
 * Normalizza qualsiasi input ruolo (enum, stringa, alias) in un valore canonico.
 */
export declare function normalizeRole(role?: string | null): AppUserRole | null;
/**
 * Verifica se il ruolo soddisfa quello richiesto, includendo ereditarietà.
 */
export declare function roleSatisfies(requiredRole: AppUserRole, role?: string | null): boolean;
export declare function isAdminRole(role?: string | null): boolean;
export declare function isSuperAdminRole(role?: string | null): boolean;
export declare function isCoachRole(role?: string | null): boolean;
export declare function isUserRole(role?: string | null): boolean;
/**
 * Authenticated User - Client-Safe Type
 * Informazioni utente autenticato senza dipendenze server
 */
export type AuthenticatedUser = {
    id: string;
    email: string;
    name: string | null;
    role: string;
    credits: number;
    image?: string | null;
    copilotEnabled: boolean;
};
