"use client"

import Link from "next/link"
import { Navigation } from "./navigation"
import { GraduationCap } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { capitalizeFirst } from "@/lib/utils"

export function Header() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 glass supports-[backdrop-filter]:bg-background/72">
      <div className="container flex h-[4.5rem] items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2">
          <Link href={session ? "/dashboard" : "/"} className="flex items-center gap-3 transition-opacity hover:opacity-80 duration-300">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold tracking-tight">CollegePath</span>
          </Link>
        </div>

        {session && <Navigation />}

        <div className="hidden md:flex items-center gap-6">
          {isLoading ? (
            <div className="h-12 w-32 bg-muted animate-pulse rounded-lg"></div>
          ) : session ? (
            <>
              <div className="text-sm">
                <p className="font-semibold text-foreground">
                  {capitalizeFirst(session.user?.name || session.user?.email || "")}
                </p>
                <p className="text-muted-foreground capitalize">{session.user?.role?.toLowerCase()}</p>
              </div>
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                variant="ghost"
                size="sm"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <div className="flex gap-3">
              <Button
                asChild
                variant="ghost"
              >
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  Get Started
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
