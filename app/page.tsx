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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-semibold mb-8 text-gradient">
            CollegePath
          </h1>
          <p className="text-3xl md:text-4xl text-foreground mb-10">
            Your Journey to College, Simplified
          </p>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
            Track your academic progress, discover perfect-fit colleges, manage applications,
            and stay on top of deadlines—all in one beautiful, intuitive platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-24">
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

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-12 mt-32">
            <Card className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Track Your Progress</h3>
              <p className="text-muted-foreground leading-relaxed">
                Log courses, test scores, activities, and achievements all in one place.
              </p>
            </Card>

            <Card className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Find Your Match</h3>
              <p className="text-muted-foreground leading-relaxed">
                Discover colleges that fit your profile with AI-powered recommendations.
              </p>
            </Card>

            <Card className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Stay Organized</h3>
              <p className="text-muted-foreground leading-relaxed">
                Never miss a deadline with personalized checklists and reminders.
              </p>
            </Card>
          </div>

          {/* Social Proof */}
          <div className="mt-32 text-center">
            <p className="text-muted-foreground mb-8 text-lg">Trusted by students nationwide</p>
            <div className="flex justify-center gap-16">
              <div>
                <div className="text-4xl font-semibold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-4xl font-semibold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Colleges</div>
              </div>
              <div>
                <div className="text-4xl font-semibold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
