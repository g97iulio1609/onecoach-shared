/**
 * NextAuth Type Declarations
 *
 * Estende i types di NextAuth con campi custom
 */

import { UserRole } from '@prisma/client';
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

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
