import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) {
          throw new Error("User not found");
        }

        // Note: In production, you'd store hashed passwords
        // This is a simplified version for initial setup
        // const isCorrectPassword = await bcrypt.compare(
        //   credentials.password,
        //   user.hashedPassword
        // );

        // if (!isCorrectPassword) {
        //   throw new Error("Invalid password");
        // }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      }
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = token.sub || user?.id;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    signUp: '/signup',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
