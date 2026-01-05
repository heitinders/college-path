import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const pathname = nextUrl.pathname

      // Public routes
      const publicRoutes = ["/", "/login", "/signup"]
      const isPublicRoute = publicRoutes.includes(pathname)

      // Public API routes
      const isApiAuthRoute = pathname.startsWith("/api/auth")

      // Allow public routes and API auth routes
      if (isPublicRoute || isApiAuthRoute) {
        return true
      }

      // Require auth for all other routes
      return isLoggedIn
    },
  },
  providers: [], // Providers will be added in auth.ts
} satisfies NextAuthConfig
