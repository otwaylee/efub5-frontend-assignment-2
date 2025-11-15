// next-auth.d.ts
import { DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession['user'];
  }
  interface JWT {
    user?: {
      name: string;
      email: string;
    };
  }
}
