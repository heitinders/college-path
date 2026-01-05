import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Target, CheckCircle2 } from "lucide-react"

export default async function Home() {
  const user = await getCurrentUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect("/dashboard")
  }

  // Landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      {/* Hero Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="rounded-3xl border bg-card/70 p-10 md:p-14 shadow-luxury backdrop-blur">
            <h1 className="text-6xl md:text-7xl font-semibold mb-6 text-gradient">
              CollegePath
            </h1>
            <p className="text-3xl md:text-4xl text-foreground mb-8">
              Your Journey to College, Simplified
            </p>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Track your academic progress, discover perfect-fit colleges, manage applications,
              and stay on top of deadlines—all in one intuitive platform built for students.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-10">
                <Link href="/signup">
                  Get Started Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-10">
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Card className="p-8 text-center bg-card/90 border-border/70 shadow-luxury-sm hover:shadow-luxury transition-all">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Track Your Progress</h3>
              <p className="text-muted-foreground leading-relaxed">
                Log courses, test scores, activities, and achievements all in one place.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card/90 border-border/70 shadow-luxury-sm hover:shadow-luxury transition-all">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Find Your Match</h3>
              <p className="text-muted-foreground leading-relaxed">
                Discover colleges that fit your profile with smart recommendations.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card/90 border-border/70 shadow-luxury-sm hover:shadow-luxury transition-all">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
                <CheckCircle2 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Stay Organized</h3>
              <p className="text-muted-foreground leading-relaxed">
                Never miss a deadline with personalized checklists and reminders.
              </p>
            </Card>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6 text-lg">Trusted by students nationwide</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-luxury-sm">
                <div className="text-3xl font-semibold text-primary mb-1">1000+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-luxury-sm">
                <div className="text-3xl font-semibold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Colleges</div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-luxury-sm">
                <div className="text-3xl font-semibold text-primary mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
