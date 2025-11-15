import { connectDB } from '@/utils/database';
import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials) {
          console.log('credentials가 제공되지 않았습니다.');
          return null;
        }
        let db = (await connectDB).db('forum');
        let user = await db
          .collection('user')
          .findOne({ email: credentials.email });
        if (!user) {
          console.log('해당 이메일은 없음');
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log('비번틀림');
          return null;
        }
        return {
          name: user.name,
          email: user.email,
          role: user.role ?? 'normal'
        };
      }
    })
  ],
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const db = (await connectDB).db('forum');
        let role = (user as any).role ?? 'normal';
        if (user.email) {
          const existingUser = await db
            .collection('user')
            .findOne({ email: user.email });
          if (!existingUser) {
            await db.collection('user').insertOne({
              email: user.email,
              name: user.name ?? '',
              role
            });
          } else {
            role = existingUser.role ?? role;
            if (!existingUser.role) {
              await db
                .collection('user')
                .updateOne({ _id: existingUser._id }, { $set: { role: role } });
            }
          }
        }
        token.user = {
          name: user.name || '',
          email: user.email || '',
          role
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    }
  }
};
export default NextAuth(authOptions);
