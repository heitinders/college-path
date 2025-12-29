import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getDaysUntil(date: string | Date): number {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function calculateProfileCompleteness(data: {
  profile?: any;
  courses?: any[];
  testScores?: any[];
  extracurriculars?: any[];
  achievements?: any[];
  preferences?: any;
}): number {
  let score = 0;
  let totalSections = 5;

  // Academics (20%)
  if (data.profile?.gpaUnweighted && data.courses && data.courses.length > 0) {
    score += 20;
  }

  // Testing (20%)
  if (data.testScores && data.testScores.length > 0) {
    score += 20;
  }

  // Extracurriculars (20%)
  if (data.extracurriculars && data.extracurriculars.length > 0) {
    score += 20;
  }

  // Achievements (20%)
  if (data.achievements && data.achievements.length > 0) {
    score += 20;
  }

  // Preferences (20%)
  if (data.preferences?.intendedMajorCodes && data.preferences.intendedMajorCodes.length > 0) {
    score += 20;
  }

  return score;
}
