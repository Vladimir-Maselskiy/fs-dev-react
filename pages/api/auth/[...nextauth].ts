import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth/next';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: 'c4a1d851a9d227c0649837ba3760cd05',
});
