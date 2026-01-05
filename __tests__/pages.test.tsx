import React from "react";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  redirect: jest.fn(),
  notFound: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(() => ({ data: null, status: "unauthenticated" })),
}));

jest.mock("@/lib/session", () => ({
  getCurrentUser: jest.fn(),
}));

const mockedGetCurrentUser = getCurrentUser as jest.Mock;
const mockedRedirect = redirect as jest.Mock;
const mockedNotFound = notFound as jest.Mock;

describe("pages render", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders home page hero", async () => {
    mockedGetCurrentUser.mockResolvedValue(null);
    const HomePage = (await import("@/app/page")).default;
    const ui = (await HomePage()) as ReactElement;
    render(ui);
    expect(screen.getByText("CollegePath")).toBeInTheDocument();
  });

  it("renders dashboard with greeting", async () => {
    mockedGetCurrentUser.mockResolvedValue({
      name: "alex smith",
      email: "alex@example.com",
    });
    const DashboardPage = (await import("@/app/dashboard/page")).default;
    const ui = (await DashboardPage()) as ReactElement;
    render(ui);
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(mockedRedirect).not.toHaveBeenCalled();
  });

  it("renders explore colleges page", async () => {
    const CollegesPage = (await import("@/app/colleges/page")).default;
    render(<CollegesPage />);
    expect(screen.getByText("Explore Colleges")).toBeInTheDocument();
  });

  it("renders college detail page", async () => {
    const CollegeDetailPage = (await import("@/app/colleges/[id]/page")).default;
    render(CollegeDetailPage({ params: { id: "u1" } }) as ReactElement);
    expect(mockedNotFound).not.toHaveBeenCalled();
    expect(screen.getByText(/Admissions Profile/i)).toBeInTheDocument();
  });

  it("renders deadlines page", async () => {
    const DeadlinesPage = (await import("@/app/deadlines/page")).default;
    render(<DeadlinesPage />);
    expect(screen.getByText("Deadlines")).toBeInTheDocument();
  });

  it("renders my colleges page", async () => {
    const MyCollegesPage = (await import("@/app/my-colleges/page")).default;
    render(MyCollegesPage() as ReactElement);
    expect(screen.getByText("My Colleges")).toBeInTheDocument();
  });

  it("renders college checklist page", async () => {
    const ChecklistPage = (await import("@/app/my-colleges/[id]/checklist/page")).default;
    render(<ChecklistPage params={{ id: "u2" }} />);
    expect(screen.getByText(/Application Checklist/i)).toBeInTheDocument();
  });

  it("renders profile page", async () => {
    const ProfilePage = (await import("@/app/profile/page")).default;
    render(<ProfilePage />);
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders onboarding page", async () => {
    const OnboardingPage = (await import("@/app/onboarding/page")).default;
    render(<OnboardingPage />);
    expect(screen.getByText(/Student Onboarding/i)).toBeInTheDocument();
  });

  it("renders roadmap page", async () => {
    const RoadmapPage = (await import("@/app/roadmap/page")).default;
    render(<RoadmapPage />);
    expect(screen.getByText("Your Roadmap")).toBeInTheDocument();
  });

  it("renders login page", async () => {
    const LoginPage = (await import("@/app/login/page")).default;
    render(<LoginPage />);
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
  });

  it("renders signup page", async () => {
    const SignupPage = (await import("@/app/signup/page")).default;
    render(<SignupPage />);
    expect(screen.getByText(/Create your account/i)).toBeInTheDocument();
  });

  it("renders parent dashboard page", async () => {
    const ParentPage = (await import("@/app/parent/page")).default;
    render(ParentPage() as ReactElement);
    expect(screen.getByText(/Parent Dashboard/i)).toBeInTheDocument();
  });

  it("renders not-found page", async () => {
    const NotFoundPage = (await import("@/app/not-found")).default;
    render(<NotFoundPage />);
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });
});
