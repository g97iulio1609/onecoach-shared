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
