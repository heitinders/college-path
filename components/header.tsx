"use client"

import Link from "next/link"
import { Navigation } from "./navigation"
import { GraduationCap } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export function Header() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 glass supports-[backdrop-filter]:bg-background/72">
      <div className="container flex h-[4.5rem] items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={session ? "/dashboard" : "/"} className="flex items-center gap-2.5 transition-transform hover:scale-105 duration-200">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight">CollegePath</span>
          </Link>
        </div>

        {session && <Navigation />}

        <div className="hidden md:flex items-center gap-4">
          {isLoading ? (
            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-lg"></div>
          ) : session ? (
            <>
              <div className="text-sm">
                <p className="font-semibold">{session.user?.name || session.user?.email}</p>
                <p className="text-muted-foreground text-xs capitalize">{session.user?.role?.toLowerCase()}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
