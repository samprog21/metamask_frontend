// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { baseUrl, secret } from '@/config';
import { UserGetApi } from "@/interfaces/UserInterface";



export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${baseUrl}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const userData = res.data;

          if (userData) {
            return userData//.user; // Return user data to be stored in session
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as UserGetApi; // Assign user data from token

      
      return session;
    },
  },
  secret: secret,
});


