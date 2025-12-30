# CollegePath Backend Implementation Plan

## Technology Stack

- **Framework**: Next.js 14 API Routes
- **Database**: PostgreSQL (Neon, Railway, or Supabase)
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Auth.js)
- **Email**: Resend or SendGrid
- **File Storage**: Vercel Blob or AWS S3
- **Data Source**: College Scorecard API

## Phase 1: Foundation Setup

### 1.1 Database Setup

**Choose a PostgreSQL provider:**
- [Neon](https://neon.tech) - Free tier, serverless PostgreSQL (Recommended)
- [Railway](https://railway.app) - $5/month, easy setup
- [Supabase](https://supabase.com) - Free tier, includes auth

**Installation:**
```bash
npm install prisma @prisma/client
npm install -D prisma
npx prisma init
```

### 1.2 Environment Variables

Create `.env.local`:
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Email
RESEND_API_KEY="..."

# College Data API
COLLEGE_SCORECARD_API_KEY="..."
```

### 1.3 Prisma Schema

**File: `prisma/schema.prisma`**

## Phase 2: Database Schema

### Core Tables

```prisma
// User & Authentication
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  image         String?
  role          UserRole  @default(STUDENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  accounts      Account[]
  sessions      Session[]
  student       Student?
  parent        Parent?
}

enum UserRole {
  STUDENT
  PARENT
  COUNSELOR
}

// Student Profile
model Student {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  firstName     String
  lastName      String
  gradeLevel    Int
  gradYear      Int
  highSchool    String?

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  profile       StudentProfile?
  courses       Course[]
  testScores    TestScore[]
  activities    Extracurricular[]
  achievements  Achievement[]
  preferences   Preferences?
  savedColleges SavedCollege[]
  checklists    Checklist[]
  parents       StudentParent[]
}

// Academic Profile
model StudentProfile {
  id              String   @id @default(cuid())
  studentId       String   @unique
  student         Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)

  gpaUnweighted   Float?
  gpaWeighted     Float?
  classRank       String?
  classSize       Int?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// Courses
model Course {
  id          String   @id @default(cuid())
  studentId   String
  student     Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)

  name        String
  level       CourseLevel
  year        Int
  subject     String?
  grade       String?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum CourseLevel {
  REGULAR
  HONORS
  AP
  IB
  DUAL_ENROLLMENT
}

// Test Scores
model TestScore {
  id          String    @id @default(cuid())
  studentId   String
  student     Student   @relation(fields: [studentId], references: [id], onDelete: Cascade)

  testType    TestType
  composite   Int?
  sectionScores Json?
  testDate    DateTime?
  planned     Boolean   @default(false)

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum TestType {
  SAT
  ACT
  AP
  IB
  TOEFL
  IELTS
}

// Extracurriculars
model Extracurricular {
  id              String   @id @default(cuid())
  studentId       String
  student         Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)

  orgName         String
  category        String
  description     String?
  leadershipRole  String?
  hoursPerWeek    Int?
  weeksPerYear    Int?
  startDate       DateTime
  endDate         DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// Achievements & Awards
model Achievement {
  id          String   @id @default(cuid())
  studentId   String
  student     Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)

  title       String
  level       AchievementLevel
  year        Int
  description String?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum AchievementLevel {
  SCHOOL
  LOCAL
  STATE
  REGIONAL
  NATIONAL
  INTERNATIONAL
}

// College Preferences
model Preferences {
  id                  String   @id @default(cuid())
  studentId           String   @unique
  student             Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)

  intendedMajorCodes  String[]
  geoPreferences      String[]
  campusSize          String?
  schoolType          String?
  budgetMin           Int?
  budgetMax           Int?

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}

// Universities
model University {
  id                String             @id @default(cuid())

  // Basic Info
  name              String
  city              String
  state             String
  region            String
  type              String
  size              String?
  website           String?

  // External IDs
  unitId            Int?               @unique // College Scorecard ID

  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt

  // Relations
  benchmarks        AdmissionsBenchmarks?
  requirements      ApplicationRequirements[]
  deadlines         ApplicationDeadline[]
  savedByStudents   SavedCollege[]
}

// Admissions Benchmarks
model AdmissionsBenchmarks {
  id                String      @id @default(cuid())
  universityId      String      @unique
  university        University  @relation(fields: [universityId], references: [id], onDelete: Cascade)

  acceptanceRate    Float?
  avgGPA            Float?
  gpa25th           Float?
  gpa75th           Float?
  sat25th           Int?
  sat75th           Int?
  act25th           Int?
  act75th           Int?

  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
}

// Application Requirements
model ApplicationRequirements {
  id                String      @id @default(cuid())
  universityId      String
  university        University  @relation(fields: [universityId], references: [id], onDelete: Cascade)

  testPolicy        String?     // test-optional, required, etc
  essaysRequired    Int?
  recLettersRequired Int?
  interviewOffered  Boolean?
  supplementsRequired Boolean?

  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
}

// Application Deadlines
model ApplicationDeadline {
  id                String      @id @default(cuid())
  universityId      String
  university        University  @relation(fields: [universityId], references: [id], onDelete: Cascade)

  type              String      // EA, ED, RD, Rolling
  deadline          DateTime
  decisionDate      DateTime?

  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
}

// Saved Colleges
model SavedCollege {
  id                String      @id @default(cuid())
  studentId         String
  student           Student     @relation(fields: [studentId], references: [id], onDelete: Cascade)
  universityId      String
  university        University  @relation(fields: [universityId], references: [id], onDelete: Cascade)

  tier              MatchTier?
  confidence        Int?
  notes             String?

  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  @@unique([studentId, universityId])
}

enum MatchTier {
  REACH
  TARGET
  SAFETY
}

// Checklists
model Checklist {
  id                String           @id @default(cuid())
  studentId         String
  student           Student          @relation(fields: [studentId], references: [id], onDelete: Cascade)
  universityId      String

  items             ChecklistItem[]

  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt

  @@unique([studentId, universityId])
}

model ChecklistItem {
  id                String      @id @default(cuid())
  checklistId       String
  checklist         Checklist   @relation(fields: [checklistId], references: [id], onDelete: Cascade)

  title             String
  description       String?
  itemType          ChecklistItemType
  dueDate           DateTime?
  status            ItemStatus  @default(NOT_STARTED)

  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
}

enum ChecklistItemType {
  APPLICATION
  ESSAY
  RECOMMENDATION
  TESTING
  INTERVIEW
  SUPPLEMENT
  CUSTOM
}

enum ItemStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETE
}

// Roadmap
model RoadmapItem {
  id                String      @id @default(cuid())

  gradeLevel        Int
  category          String
  title             String
  description       String?
  timeframe         String?
  isDefault         Boolean     @default(true)

  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
}

// Parent Access
model Parent {
  id                String          @id @default(cuid())
  userId            String          @unique
  user              User            @relation(fields: [userId], references: [id], onDelete: Cascade)

  students          StudentParent[]

  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt
}

model StudentParent {
  studentId         String
  student           Student         @relation(fields: [studentId], references: [id], onDelete: Cascade)
  parentId          String
  parent            Parent          @relation(fields: [parentId], references: [id], onDelete: Cascade)

  relationship      String          // mother, father, guardian
  accessLevel       ParentAccessLevel @default(READ_ONLY)

  createdAt         DateTime        @default(now())

  @@id([studentId, parentId])
}

enum ParentAccessLevel {
  READ_ONLY
  CAN_EDIT
}

// NextAuth Models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

## Phase 3: Authentication Setup

### 3.1 Install NextAuth

```bash
npm install next-auth @auth/prisma-adapter
```

### 3.2 NextAuth Configuration

**File: `app/api/auth/[...nextauth]/route.ts`**

```typescript
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Implementation here
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add role to session
      return session
    },
  },
  pages: {
    signIn: '/login',
    signUp: '/signup',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

## Phase 4: API Routes Structure

```
app/api/
├── auth/
│   └── [...nextauth]/route.ts
├── profile/
│   ├── route.ts (GET, PUT)
│   ├── courses/
│   │   ├── route.ts (GET, POST)
│   │   └── [id]/route.ts (PUT, DELETE)
│   ├── test-scores/route.ts
│   ├── activities/route.ts
│   └── achievements/route.ts
├── colleges/
│   ├── route.ts (GET with search/filter)
│   ├── [id]/
│   │   ├── route.ts (GET)
│   │   ├── benchmarks/route.ts
│   │   └── requirements/route.ts
│   └── sync/route.ts (sync from College Scorecard)
├── my-colleges/
│   ├── route.ts (GET, POST)
│   └── [id]/
│       ├── route.ts (DELETE)
│       ├── match/route.ts
│       └── checklist/route.ts
├── roadmap/
│   ├── route.ts (GET)
│   └── [id]/route.ts (PUT)
└── parent/
    └── student/[id]/route.ts
```

## Phase 5: College Scorecard Integration

### 5.1 Get API Key
Sign up at: https://collegescorecard.ed.gov/data/documentation/

### 5.2 College Data Sync Service

**File: `lib/services/college-scorecard.ts`**

```typescript
const SCORECARD_API_URL = 'https://api.data.gov/ed/collegescorecard/v1'

export async function fetchColleges(params: {
  page?: number
  perPage?: number
  state?: string
}) {
  const response = await fetch(
    `${SCORECARD_API_URL}/schools?api_key=${process.env.COLLEGE_SCORECARD_API_KEY}&_fields=id,school.name,school.city,school.state,admissions.admission_rate.overall,admissions.sat_scores.average.overall&_page=${params.page || 0}&_per_page=${params.perPage || 100}`
  )
  return response.json()
}
```

## Phase 6: Match Algorithm

**File: `lib/services/match-algorithm.ts`**

Basic implementation to calculate match tier based on student profile vs college benchmarks.

## Phase 7: Deployment Checklist

- [ ] Set up PostgreSQL database (Neon/Railway/Supabase)
- [ ] Configure environment variables in Vercel
- [ ] Run Prisma migrations: `npx prisma migrate deploy`
- [ ] Seed database with roadmap items
- [ ] Sync initial college data from Scorecard API
- [ ] Set up Google OAuth credentials
- [ ] Configure email service (Resend/SendGrid)
- [ ] Test authentication flow
- [ ] Test all API endpoints

## Next Steps

1. **Choose Database Provider** - Sign up for Neon, Railway, or Supabase
2. **Set Up Prisma** - Initialize and create migrations
3. **Implement Auth** - Set up NextAuth with Google + Email
4. **Build API Routes** - Start with profile and colleges endpoints
5. **Integrate College Data** - Sync from College Scorecard API
6. **Testing** - Test all endpoints and flows

## Cost Estimate

- **Database (Neon)**: Free tier (sufficient for MVP)
- **Vercel Hosting**: Free tier (sufficient for MVP)
- **Email (Resend)**: Free tier (3,000 emails/month)
- **College Scorecard API**: Free
- **Google OAuth**: Free

**Total Monthly Cost for MVP: $0**

---

Ready to start implementation? Let me know which phase you'd like to begin with!
