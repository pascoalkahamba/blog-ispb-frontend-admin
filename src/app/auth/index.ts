import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ILoginResponse, IUser } from "@/interfaces";
import { signin } from "@/server";

export const authOptions: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        terms: { label: "Terms", type: "select" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const response = await signin({
            email: credentials.email as string,
            password: credentials.password as string,
            terms: credentials.terms as boolean,
          });

          const { user, token } = response.data as ILoginResponse;

          if (user && token && response.status === 200) {
            // Retorne o objeto user e o token para ser usado nos callbacks
            return { ...user, token };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as IUser;
      return session;
    },
  },
  basePath: process.env.AUTH0_BASE_URL,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET as string,
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
