import type {
  Student,
  StudentProfile,
  Course,
  TestScore,
  Extracurricular,
  Achievement,
  Preferences,
  University,
  AdmissionsBenchmarks,
  MatchResult,
  SavedCollege,
  ChecklistItem,
  RoadmapItem,
  Deadline,
  ApplicationRequirements,
  ApplicationDeadline,
} from '@/types';

// Mock Student
export const mockStudent: Student = {
  id: 'student-1',
  userId: 'user-1',
  gradeLevel: 11,
  gradYear: 2026,
  highSchoolName: 'Lincoln High School',
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@email.com',
};

// Mock Profile
export const mockProfile: StudentProfile = {
  studentId: 'student-1',
  gpaUnweighted: 3.7,
  gpaWeighted: 4.1,
  classRank: 'Top 15%',
  rigorScore: 8,
};

// Mock Courses
export const mockCourses: Course[] = [
  { id: 'c1', studentId: 'student-1', name: 'AP Calculus AB', level: 'ap', year: 11, grade: 'A' },
  { id: 'c2', studentId: 'student-1', name: 'AP English Language', level: 'ap', year: 11, grade: 'A-' },
  { id: 'c3', studentId: 'student-1', name: 'AP US History', level: 'ap', year: 11, grade: 'B+' },
  { id: 'c4', studentId: 'student-1', name: 'Honors Chemistry', level: 'honors', year: 11, grade: 'A' },
  { id: 'c5', studentId: 'student-1', name: 'Spanish III', level: 'regular', year: 11, grade: 'A' },
];

// Mock Test Scores
export const mockTestScores: TestScore[] = [
  {
    id: 't1',
    studentId: 'student-1',
    testType: 'sat',
    composite: 1380,
    sectionScores: { 'math': 720, 'reading': 660 },
    testDate: '2025-10-15',
    planned: false,
  },
  {
    id: 't2',
    studentId: 'student-1',
    testType: 'psat',
    composite: 1310,
    sectionScores: { 'math': 680, 'reading': 630 },
    testDate: '2024-10-10',
    planned: false,
  },
  {
    id: 't3',
    studentId: 'student-1',
    testType: 'sat',
    composite: 0,
    planned: true,
    testDate: '2026-03-15',
  },
];

// Mock Extracurriculars
export const mockExtracurriculars: Extracurricular[] = [
  {
    id: 'e1',
    studentId: 'student-1',
    category: 'Academic',
    orgName: 'Math Club',
    startDate: '2023-09-01',
    hoursPerWeek: 3,
    leadershipRole: 'Vice President',
    description: 'Compete in regional and state math competitions',
  },
  {
    id: 'e2',
    studentId: 'student-1',
    category: 'Community Service',
    orgName: 'Local Food Bank',
    startDate: '2023-01-15',
    hoursPerWeek: 4,
    description: 'Volunteer organizing food drives and distributions',
  },
  {
    id: 'e3',
    studentId: 'student-1',
    category: 'Sports',
    orgName: 'Varsity Soccer',
    startDate: '2022-08-20',
    hoursPerWeek: 12,
    leadershipRole: 'Team Captain',
  },
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'a1',
    studentId: 'student-1',
    title: 'National Merit Commended Scholar',
    level: 'national',
    year: 2025,
  },
  {
    id: 'a2',
    studentId: 'student-1',
    title: 'State Math Competition - 3rd Place',
    level: 'state',
    year: 2025,
  },
  {
    id: 'a3',
    studentId: 'student-1',
    title: 'AP Scholar',
    level: 'national',
    year: 2025,
  },
];

// Mock Preferences
export const mockPreferences: Preferences = {
  studentId: 'student-1',
  intendedMajorCodes: ['computer-science', 'mathematics'],
  geoPreferences: ['Northeast', 'West Coast'],
  budgetRange: { min: 20000, max: 60000 },
  campusSize: 'medium',
  schoolType: 'any',
};

// Mock Universities
export const mockUniversities: University[] = [
  {
    id: '110635',
    name: 'University of California, Berkeley',
    city: 'Berkeley',
    state: 'CA',
    type: 'public',
    website: 'https://berkeley.edu',
    size: 'large',
    region: 'West Coast',
  },
  {
    id: '164988',
    name: 'Boston University',
    city: 'Boston',
    state: 'MA',
    type: 'private',
    website: 'https://bu.edu',
    size: 'large',
    region: 'Northeast',
  },
  {
    id: '236948',
    name: 'University of Washington',
    city: 'Seattle',
    state: 'WA',
    type: 'public',
    website: 'https://washington.edu',
    size: 'large',
    region: 'West Coast',
  },
  {
    id: '167358',
    name: 'Northeastern University',
    city: 'Boston',
    state: 'MA',
    type: 'private',
    website: 'https://northeastern.edu',
    size: 'large',
    region: 'Northeast',
  },
  {
    id: '145637',
    name: 'University of Illinois Urbana-Champaign',
    city: 'Champaign',
    state: 'IL',
    type: 'public',
    website: 'https://illinois.edu',
    size: 'large',
    region: 'Midwest',
  },
  {
    id: '243780',
    name: 'Purdue University',
    city: 'West Lafayette',
    state: 'IN',
    type: 'public',
    website: 'https://purdue.edu',
    size: 'large',
    region: 'Midwest',
  },
  {
    id: '122931',
    name: 'Santa Clara University',
    city: 'Santa Clara',
    state: 'CA',
    type: 'private',
    website: 'https://scu.edu',
    size: 'medium',
    region: 'West Coast',
  },
  {
    id: '195003',
    name: 'Rochester Institute of Technology',
    city: 'Rochester',
    state: 'NY',
    type: 'private',
    website: 'https://rit.edu',
    size: 'medium',
    region: 'Northeast',
  },
];

// Mock Benchmarks
export const mockBenchmarks: Record<string, AdmissionsBenchmarks> = {
  110635: {
    universityId: '110635',
    cycleYear: 2025,
    gpaRange: { min: 3.9, max: 4.0 },
    satMid50: { low: 1330, high: 1530 },
    actMid50: { low: 31, high: 35 },
    acceptanceRate: 0.11,
    testPolicy: 'required',
  },
  164988: {
    universityId: '164988',
    cycleYear: 2025,
    gpaRange: { min: 3.7, max: 4.0 },
    satMid50: { low: 1310, high: 1500 },
    actMid50: { low: 30, high: 34 },
    acceptanceRate: 0.18,
    testPolicy: 'optional',
  },
  236948: {
    universityId: '236948',
    cycleYear: 2025,
    gpaRange: { min: 3.7, max: 4.0 },
    satMid50: { low: 1300, high: 1500 },
    actMid50: { low: 29, high: 34 },
    acceptanceRate: 0.48,
    testPolicy: 'optional',
  },
  167358: {
    universityId: '167358',
    cycleYear: 2025,
    gpaRange: { min: 3.8, max: 4.0 },
    satMid50: { low: 1390, high: 1540 },
    actMid50: { low: 32, high: 35 },
    acceptanceRate: 0.07,
    testPolicy: 'optional',
  },
  145637: {
    universityId: '145637',
    cycleYear: 2025,
    gpaRange: { min: 3.6, max: 4.0 },
    satMid50: { low: 1340, high: 1520 },
    actMid50: { low: 30, high: 34 },
    acceptanceRate: 0.45,
    testPolicy: 'optional',
  },
  243780: {
    universityId: '243780',
    cycleYear: 2025,
    gpaRange: { min: 3.5, max: 3.9 },
    satMid50: { low: 1200, high: 1470 },
    actMid50: { low: 26, high: 33 },
    acceptanceRate: 0.53,
    testPolicy: 'optional',
  },
  122931: {
    universityId: '122931',
    cycleYear: 2025,
    gpaRange: { min: 3.5, max: 3.9 },
    satMid50: { low: 1280, high: 1460 },
    actMid50: { low: 29, high: 33 },
    acceptanceRate: 0.52,
    testPolicy: 'optional',
  },
  195003: {
    universityId: '195003',
    cycleYear: 2025,
    gpaRange: { min: 3.6, max: 3.9 },
    satMid50: { low: 1270, high: 1450 },
    actMid50: { low: 28, high: 33 },
    acceptanceRate: 0.66,
    testPolicy: 'optional',
  },
};

// Mock Match Results
export const mockMatchResults: Record<string, MatchResult> = {
  110635: {
    universityId: '110635',
    tier: 'reach',
    confidence: 'low',
    rationale: [
      'Your GPA is below the median for admitted students',
      'SAT score is below the 25th percentile',
      'Strong extracurricular profile with leadership',
    ],
    gaps: [
      { area: 'Testing', suggestion: 'Consider retaking SAT to reach 1450+', priority: 1 },
      { area: 'Academic Rigor', suggestion: 'Continue AP course trajectory in senior year', priority: 2 },
    ],
  },
  164988: {
    universityId: '164988',
    tier: 'target',
    confidence: 'medium',
    rationale: [
      'Your GPA matches the middle 50% range',
      'SAT score is near the median',
      'Strong match for intended major',
    ],
    gaps: [
      { area: 'Testing', suggestion: 'A higher SAT score would strengthen your application', priority: 2 },
    ],
  },
  236948: {
    universityId: '236948',
    tier: 'target',
    confidence: 'high',
    rationale: [
      'Your academic profile aligns well with admitted students',
      'Strong in-state advantage (if applicable)',
      'Solid extracurricular engagement',
    ],
    gaps: [],
  },
  243780: {
    universityId: '243780',
    tier: 'safety',
    confidence: 'high',
    rationale: [
      'Your GPA exceeds the median',
      'SAT score is above the 75th percentile',
      'Strong overall profile for this institution',
    ],
    gaps: [],
  },
};

// Mock Saved Colleges
export const mockSavedColleges: SavedCollege[] = [
  {
    id: 'sc1',
    studentId: 'student-1',
    universityId: '110635',
    interestLevel: 'interested',
    savedDate: '2025-11-15',
  },
  {
    id: 'sc2',
    studentId: 'student-1',
    universityId: '164988',
    interestLevel: 'top_choice',
    savedDate: '2025-11-10',
  },
  {
    id: 'sc3',
    studentId: 'student-1',
    universityId: '236948',
    interestLevel: 'interested',
    savedDate: '2025-11-20',
  },
  {
    id: 'sc4',
    studentId: 'student-1',
    universityId: '243780',
    interestLevel: 'exploring',
    savedDate: '2025-12-01',
  },
];

// Mock Application Requirements
export const mockRequirements: Record<string, ApplicationRequirements> = {
  110635: {
    universityId: '110635',
    essaysRequired: 4,
    recLettersRequired: 2,
    interviewOffered: false,
    interviewRequired: false,
    supplementsRequired: ['Activities list', 'Additional info'],
  },
  164988: {
    universityId: '164988',
    essaysRequired: 2,
    recLettersRequired: 2,
    interviewOffered: true,
    interviewRequired: false,
    supplementsRequired: ['Why BU essay'],
  },
};

// Mock Deadlines
export const mockApplicationDeadlines: Record<string, ApplicationDeadline[]> = {
  110635: [
    { universityId: '110635', planType: 'EA', deadline: '2025-11-01' },
    { universityId: '110635', planType: 'RD', deadline: '2025-11-30' },
  ],
  164988: [
    { universityId: '164988', planType: 'ED', deadline: '2025-11-01' },
    { universityId: '164988', planType: 'ED2', deadline: '2026-01-01' },
    { universityId: '164988', planType: 'RD', deadline: '2026-01-04' },
  ],
};

// Mock Checklist Items
export const mockChecklistItems: ChecklistItem[] = [
  {
    id: 'ci1',
    schoolChecklistId: 'scl1',
    itemType: 'application',
    title: 'Submit Common Application',
    status: 'not_started',
    dueDate: '2026-01-04',
  },
  {
    id: 'ci2',
    schoolChecklistId: 'scl1',
    itemType: 'essay',
    title: 'Write Personal Statement',
    status: 'in_progress',
    dueDate: '2025-12-15',
    notes: 'Draft in progress, needs revision',
  },
  {
    id: 'ci3',
    schoolChecklistId: 'scl1',
    itemType: 'essay',
    title: 'Complete "Why BU" Supplement',
    status: 'not_started',
    dueDate: '2025-12-20',
  },
  {
    id: 'ci4',
    schoolChecklistId: 'scl1',
    itemType: 'recommendation',
    title: 'Request Teacher Recommendation #1',
    status: 'complete',
    dueDate: '2025-12-01',
  },
  {
    id: 'ci5',
    schoolChecklistId: 'scl1',
    itemType: 'recommendation',
    title: 'Request Teacher Recommendation #2',
    status: 'complete',
    dueDate: '2025-12-01',
  },
  {
    id: 'ci6',
    schoolChecklistId: 'scl1',
    itemType: 'testing',
    title: 'Send SAT Scores',
    status: 'not_started',
    dueDate: '2025-12-15',
  },
];

// Mock Roadmap Items
export const mockRoadmapItems: RoadmapItem[] = [
  {
    id: 'r1',
    studentId: 'student-1',
    actionCode: 'SAT_PREP',
    title: 'Begin SAT Preparation',
    description: 'Start systematic SAT prep using Khan Academy or other resources',
    gradeLevel: 11,
    category: 'testing',
    status: 'complete',
    timingWindow: 'Fall',
  },
  {
    id: 'r2',
    studentId: 'student-1',
    actionCode: 'COLLEGE_RESEARCH',
    title: 'Research Colleges',
    description: 'Create initial list of 15-20 colleges that match your interests',
    gradeLevel: 11,
    category: 'applications',
    status: 'complete',
    timingWindow: 'Fall',
  },
  {
    id: 'r3',
    studentId: 'student-1',
    actionCode: 'ESSAY_BRAINSTORM',
    title: 'Brainstorm Essay Topics',
    description: 'Reflect on experiences and start brainstorming personal statement topics',
    gradeLevel: 11,
    category: 'applications',
    status: 'in_progress',
    timingWindow: 'Winter',
  },
  {
    id: 'r4',
    studentId: 'student-1',
    actionCode: 'TEACHER_RECS',
    title: 'Request Teacher Recommendations',
    description: 'Ask 2-3 teachers who know you well for letters of recommendation',
    gradeLevel: 11,
    category: 'applications',
    status: 'not_started',
    dueDate: '2026-03-01',
    timingWindow: 'Spring',
  },
  {
    id: 'r5',
    studentId: 'student-1',
    actionCode: 'SUMMER_PLANS',
    title: 'Plan Meaningful Summer Activities',
    description: 'Secure internship, research position, or community service opportunity',
    gradeLevel: 11,
    category: 'summer',
    status: 'not_started',
    timingWindow: 'Spring',
  },
  {
    id: 'r6',
    studentId: 'student-1',
    actionCode: 'FINALIZE_LIST',
    title: 'Finalize College List',
    description: 'Narrow down to 8-12 schools with balanced reach/target/safety mix',
    gradeLevel: 12,
    category: 'applications',
    status: 'not_started',
    timingWindow: 'Summer',
  },
];

// Mock Deadlines
export const mockDeadlines: Deadline[] = [
  {
    id: 'd1',
    studentId: 'student-1',
    title: 'Boston University - ED2 Deadline',
    date: '2026-01-04',
    type: 'application',
    universityId: '164988',
  },
  {
    id: 'd2',
    studentId: 'student-1',
    title: 'SAT Test Date',
    date: '2026-03-15',
    type: 'testing',
  },
  {
    id: 'd3',
    studentId: 'student-1',
    title: 'Request Teacher Recommendations',
    date: '2026-03-01',
    type: 'milestone',
    roadmapItemId: 'r4',
  },
  {
    id: 'd4',
    studentId: 'student-1',
    title: 'UC Berkeley - RD Deadline',
    date: '2025-11-30',
    type: 'application',
    universityId: '110635',
  },
];
