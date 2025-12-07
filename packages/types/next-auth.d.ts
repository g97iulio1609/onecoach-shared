/**
 * NextAuth Type Declarations
 *
 * Extends NextAuth types with custom fields
 */

import type { UserRole } from '@prisma/client';
import type { DefaultSession, DefaultUser } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      credits: number;
      image?: string | null;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
    credits: number;
    image?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    credits: number;
    image?: string | null;
  }
}
