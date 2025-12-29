// Core User and Student Types
export interface Student {
  id: string;
  userId: string;
  gradeLevel: 9 | 10 | 11 | 12;
  gradYear: number;
  highSchoolName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface StudentProfile {
  studentId: string;
  gpaUnweighted: number;
  gpaWeighted?: number;
  classRank?: string;
  rigorScore?: number;
}

// Academic Types
export interface Course {
  id: string;
  studentId: string;
  name: string;
  level: 'regular' | 'honors' | 'ap' | 'ib' | 'dual_enrollment';
  year: number;
  grade?: string;
}

export interface TestScore {
  id: string;
  studentId: string;
  testType: 'sat' | 'act' | 'psat' | 'ap' | 'ib' | 'other';
  composite?: number;
  sectionScores?: Record<string, number>;
  testDate?: string;
  planned: boolean;
}

// Extracurricular and Achievements
export interface Extracurricular {
  id: string;
  studentId: string;
  category: string;
  orgName: string;
  startDate: string;
  endDate?: string;
  hoursPerWeek: number;
  leadershipRole?: string;
  description?: string;
}

export interface Achievement {
  id: string;
  studentId: string;
  title: string;
  level: 'school' | 'regional' | 'state' | 'national' | 'international';
  year: number;
}

// Preferences
export interface Preferences {
  studentId: string;
  intendedMajorCodes: string[];
  geoPreferences: string[];
  budgetRange?: { min: number; max: number };
  campusSize?: 'small' | 'medium' | 'large';
  schoolType?: 'public' | 'private' | 'any';
}

// University Types
export interface University {
  id: string;
  name: string;
  city: string;
  state: string;
  type: 'public' | 'private';
  website: string;
  size?: 'small' | 'medium' | 'large';
  region?: string;
}

export interface AdmissionsBenchmarks {
  universityId: string;
  cycleYear: number;
  gpaRange: { min: number; max: number };
  satMid50: { low: number; high: number };
  actMid50: { low: number; high: number };
  acceptanceRate: number;
  testPolicy?: 'required' | 'optional' | 'blind';
}

export interface ApplicationRequirements {
  universityId: string;
  essaysRequired: number;
  recLettersRequired: number;
  interviewOffered: boolean;
  interviewRequired: boolean;
  supplementsRequired: string[];
}

export interface ApplicationDeadline {
  universityId: string;
  planType: 'EA' | 'ED' | 'ED2' | 'RD' | 'Rolling';
  deadline: string;
}

// Matching and Saved Colleges
export interface MatchResult {
  universityId: string;
  tier: 'reach' | 'target' | 'safety';
  confidence: 'low' | 'medium' | 'high';
  rationale: string[];
  gaps: Array<{ area: string; suggestion: string; priority: number }>;
}

export interface SavedCollege {
  id: string;
  studentId: string;
  universityId: string;
  programCode?: string;
  interestLevel: 'exploring' | 'interested' | 'top_choice';
  savedDate: string;
}

// Checklist Types
export interface SchoolChecklist {
  id: string;
  studentId: string;
  universityId: string;
  savedCollegeId: string;
}

export interface ChecklistItem {
  id: string;
  schoolChecklistId: string;
  itemType: 'application' | 'essay' | 'recommendation' | 'testing' | 'interview' | 'supplement';
  title: string;
  status: 'not_started' | 'in_progress' | 'complete';
  dueDate?: string;
  notes?: string;
}

// Roadmap Types
export interface RoadmapItem {
  id: string;
  studentId: string;
  actionCode: string;
  title: string;
  description: string;
  gradeLevel: 9 | 10 | 11 | 12;
  category: 'academics' | 'testing' | 'extracurriculars' | 'summer' | 'applications';
  status: 'not_started' | 'in_progress' | 'complete';
  dueDate?: string;
  timingWindow?: string;
}

// Deadline Types
export interface Deadline {
  id: string;
  studentId: string;
  title: string;
  date: string;
  type: 'application' | 'testing' | 'school_specific' | 'milestone';
  universityId?: string;
  roadmapItemId?: string;
  checklistItemId?: string;
}

// Composite Types for UI
export interface UniversityWithBenchmarks extends University {
  benchmarks?: AdmissionsBenchmarks;
}

export interface SavedCollegeWithDetails extends SavedCollege {
  university: University;
  benchmarks?: AdmissionsBenchmarks;
  match?: MatchResult;
  checklistProgress?: {
    total: number;
    completed: number;
  };
  nextDeadline?: string;
}

export interface ProfileCompleteness {
  overall: number;
  sections: {
    academics: number;
    testing: number;
    extracurriculars: number;
    achievements: number;
    preferences: number;
  };
  missingFields: string[];
}
