import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import Link from "next/link"

export default async function Home() {
  const user = await getCurrentUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect("/dashboard")
  }

  // Landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CollegePath
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Your Journey to College, Simplified
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Track your academic progress, discover perfect-fit colleges, manage applications,
            and stay on top of deadlines—all in one beautiful, intuitive platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-blue-600 transition-all"
            >
              Sign In
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Track Your Progress</h3>
              <p className="text-gray-600">
                Log courses, test scores, activities, and achievements all in one place.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Find Your Match</h3>
              <p className="text-gray-600">
                Discover colleges that fit your profile with AI-powered recommendations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Stay Organized</h3>
              <p className="text-gray-600">
                Never miss a deadline with personalized checklists and reminders.
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-20 text-center">
            <p className="text-gray-500 mb-4">Trusted by students nationwide</p>
            <div className="flex justify-center gap-8 text-gray-400">
              <div>
                <div className="text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-sm">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">500+</div>
                <div className="text-sm">Colleges</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">95%</div>
                <div className="text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
