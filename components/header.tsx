import Link from "next/link";
import { Navigation } from "./navigation";
import { GraduationCap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 glass supports-[backdrop-filter]:bg-background/72">
      <div className="container flex h-[4.5rem] items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2.5 transition-transform hover:scale-105 duration-200">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight">CollegePath</span>
          </Link>
        </div>

        <Navigation />

        <div className="hidden md:flex items-center gap-4">
          <div className="text-sm">
            <p className="font-semibold">Alex Johnson</p>
            <p className="text-muted-foreground text-xs">Class of 2026</p>
          </div>
        </div>
      </div>
    </header>
  );
}
