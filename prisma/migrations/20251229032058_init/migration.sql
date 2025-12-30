-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'PARENT', 'COUNSELOR');

-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('REGULAR', 'HONORS', 'AP', 'IB', 'DUAL_ENROLLMENT');

-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('SAT', 'ACT', 'AP', 'IB', 'TOEFL', 'IELTS');

-- CreateEnum
CREATE TYPE "AchievementLevel" AS ENUM ('SCHOOL', 'LOCAL', 'STATE', 'REGIONAL', 'NATIONAL', 'INTERNATIONAL');

-- CreateEnum
CREATE TYPE "MatchTier" AS ENUM ('REACH', 'TARGET', 'SAFETY');

-- CreateEnum
CREATE TYPE "ChecklistItemType" AS ENUM ('APPLICATION', 'ESSAY', 'RECOMMENDATION', 'TESTING', 'INTERVIEW', 'SUPPLEMENT', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETE');

-- CreateEnum
CREATE TYPE "ParentAccessLevel" AS ENUM ('READ_ONLY', 'CAN_EDIT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "name" TEXT,
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gradeLevel" INTEGER NOT NULL,
    "gradYear" INTEGER NOT NULL,
    "highSchool" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "gpaUnweighted" DOUBLE PRECISION,
    "gpaWeighted" DOUBLE PRECISION,
    "classRank" TEXT,
    "classSize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" "CourseLevel" NOT NULL,
    "year" INTEGER NOT NULL,
    "subject" TEXT,
    "grade" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestScore" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "testType" "TestType" NOT NULL,
    "composite" INTEGER,
    "sectionScores" JSONB,
    "testDate" TIMESTAMP(3),
    "planned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extracurricular" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "leadershipRole" TEXT,
    "hoursPerWeek" INTEGER,
    "weeksPerYear" INTEGER,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Extracurricular_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" "AchievementLevel" NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "intendedMajorCodes" TEXT[],
    "geoPreferences" TEXT[],
    "campusSize" TEXT,
    "schoolType" TEXT,
    "budgetMin" INTEGER,
    "budgetMax" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" TEXT,
    "website" TEXT,
    "unitId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmissionsBenchmarks" (
    "id" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "acceptanceRate" DOUBLE PRECISION,
    "avgGPA" DOUBLE PRECISION,
    "gpa25th" DOUBLE PRECISION,
    "gpa75th" DOUBLE PRECISION,
    "sat25th" INTEGER,
    "sat75th" INTEGER,
    "act25th" INTEGER,
    "act75th" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdmissionsBenchmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationRequirements" (
    "id" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "testPolicy" TEXT,
    "essaysRequired" INTEGER,
    "recLettersRequired" INTEGER,
    "interviewOffered" BOOLEAN,
    "supplementsRequired" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationRequirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationDeadline" (
    "id" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "decisionDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationDeadline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedCollege" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "tier" "MatchTier",
    "confidence" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedCollege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checklist" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Checklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistItem" (
    "id" TEXT NOT NULL,
    "checklistId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "itemType" "ChecklistItemType" NOT NULL,
    "dueDate" TIMESTAMP(3),
    "status" "ItemStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapItem" (
    "id" TEXT NOT NULL,
    "gradeLevel" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "timeframe" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoadmapItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentParent" (
    "studentId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "accessLevel" "ParentAccessLevel" NOT NULL DEFAULT 'READ_ONLY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentParent_pkey" PRIMARY KEY ("studentId","parentId")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_studentId_key" ON "StudentProfile"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_studentId_key" ON "Preferences"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "University_unitId_key" ON "University"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionsBenchmarks_universityId_key" ON "AdmissionsBenchmarks"("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedCollege_studentId_universityId_key" ON "SavedCollege"("studentId", "universityId");

-- CreateIndex
CREATE UNIQUE INDEX "Checklist_studentId_universityId_key" ON "Checklist"("studentId", "universityId");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_userId_key" ON "Parent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestScore" ADD CONSTRAINT "TestScore_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extracurricular" ADD CONSTRAINT "Extracurricular_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionsBenchmarks" ADD CONSTRAINT "AdmissionsBenchmarks_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationRequirements" ADD CONSTRAINT "ApplicationRequirements_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationDeadline" ADD CONSTRAINT "ApplicationDeadline_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCollege" ADD CONSTRAINT "SavedCollege_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCollege" ADD CONSTRAINT "SavedCollege_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentParent" ADD CONSTRAINT "StudentParent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentParent" ADD CONSTRAINT "StudentParent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
