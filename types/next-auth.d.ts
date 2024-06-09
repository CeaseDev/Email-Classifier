import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      image?: string | null;
    } & DefaultSession['user'];
  }

  interface JWT {
    accessToken?: string;
    picture?: string;
  }
}
