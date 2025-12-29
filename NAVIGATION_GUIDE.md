# CollegePath - Navigation Flow Guide

## 🗺️ Application Structure

```
┌─────────────────────────────────────────────────────┐
│                     HEADER                          │
│  [Logo] Dashboard Profile Explore My Colleges      │
│         Roadmap Deadlines                    [User] │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │  START: Root Page (/)          │
        │  Redirects to → /dashboard     │
        └────────────────────────────────┘
```

## 📱 Main Navigation Flow

### 1. Dashboard Hub (`/dashboard`)
**The central hub - where students land after login**

```
/dashboard
├── Profile Completeness Card
│   └── [Complete Profile] → /profile
├── My Colleges Card (4 saved)
│   └── [View All Colleges] → /my-colleges
├── Quick Actions
│   ├── [Explore Colleges] → /colleges
│   ├── [View My Roadmap] → /roadmap
│   └── [Check Deadlines] → /deadlines
├── Upcoming Deadlines (3)
│   └── [View all] → /deadlines
└── Roadmap Preview
    └── [View full roadmap] → /roadmap
```

**Key Features:**
- At-a-glance overview of everything
- Profile completion percentage
- Tier breakdown (Reach/Target/Safety)
- Next 3 deadlines
- Current roadmap tasks
- Quick action buttons to all major features

---

### 2. Profile Management (`/profile`)
**Tabbed interface for managing student data**

```
/profile
├── Tab: Academics
│   ├── GPA (Unweighted/Weighted)
│   ├── Class Rank
│   └── Course List [+Add Course]
├── Tab: Testing
│   └── Test Scores [+Add Test Score]
├── Tab: Activities
│   └── Extracurriculars [+Add Activity]
├── Tab: Achievements
│   └── Awards [+Add Achievement]
└── Tab: Preferences
    ├── Intended Majors
    ├── Geographic Preferences
    ├── Campus Size & Type
    └── Budget Range
```

**Navigation from here:**
- All tabs accessible via horizontal scroll/click
- [Save Preferences] button
- Back to dashboard via header nav

---

### 3. College Explorer (`/colleges`)
**Search and discover universities**

```
/colleges
├── Search Bar (by name, city, state)
├── [Filters] Toggle
│   ├── State dropdown
│   ├── Type (Public/Private)
│   ├── Size (Small/Medium/Large)
│   └── Region
├── Results Grid
│   └── University Cards
│       ├── [Add to My List] → Saves to /my-colleges
│       └── [View Details] → /colleges/[id]
└── Filter Chips (active filters with counts)
```

**Sample Flow:**
1. Search "Boston"
2. Filter by "Private"
3. Click "Boston University" card
4. → Navigate to `/colleges/u2`

---

### 4. School Detail Page (`/colleges/[id]`)
**Comprehensive university information**

```
/colleges/u2 (Boston University)
├── Header
│   ├── University Name
│   ├── Location Badge
│   ├── Type/Size Badges
│   ├── [Add to My List] or [✓ Saved]
│   └── [Visit Website] ↗
├── Left Column (2/3)
│   ├── Admissions Profile Card
│   │   ├── Acceptance Rate
│   │   ├── GPA Range
│   │   ├── SAT/ACT Mid-50%
│   │   └── Test Policy Badge
│   ├── Application Requirements Card
│   │   ├── Essays Required
│   │   ├── Recommendation Letters
│   │   ├── Interview Status
│   │   └── Supplements List
│   └── Application Deadlines Card
│       ├── EA: Nov 1
│       ├── ED2: Jan 1
│       └── RD: Jan 4
└── Right Column (1/3)
    ├── Match Analysis Panel
    │   ├── Tier Badge (Target)
    │   ├── Confidence Badge (Medium)
    │   ├── Why this match? (3 bullets)
    │   └── Areas for Improvement
    └── [View Checklist] → /my-colleges/sc2/checklist
```

**Key Actions:**
- [Add to My List] → Saves college, enables checklist
- [View Checklist] → Only if saved
- [Visit Website] → External link

---

### 5. My Colleges List (`/my-colleges`)
**Saved schools organized by tier**

```
/my-colleges
├── Header: "4 schools on your list"
├── [Explore More Colleges] → /colleges
├── 🟠 Reach Schools (1)
│   └── UC Berkeley Card
│       ├── Progress: 0/6
│       ├── Next: Nov 30
│       ├── [Checklist] → /my-colleges/sc1/checklist
│       └── [Details] → /colleges/u1
├── 🟢 Target Schools (2)
│   ├── Boston University Card
│   │   ├── Progress: 2/6
│   │   ├── Next: Jan 4
│   │   └── [Checklist] [Details]
│   └── UW Card
└── 🔵 Safety Schools (1)
    └── Purdue Card
```

**Flow Examples:**
- Click [Checklist] → View/edit application tasks
- Click [Details] → See full university info
- Progress bars show completion
- Color-coded tier badges

---

### 6. School Checklist (`/my-colleges/[id]/checklist`)
**Track application progress per school**

```
/my-colleges/sc2/checklist (Boston University)
├── [← Back to My Colleges]
├── Header: Boston University
├── Overall Progress Card
│   ├── Progress Bar: 2/6 (33%)
│   └── "33% complete - Keep going!"
├── Application Section (1/1)
│   └── [✓] Submit Common Application
├── Essays Section (0/2)
│   ├── [ ] Write Personal Statement
│   └── [ ] Complete "Why BU" Supplement
├── Recommendations Section (2/2)
│   ├── [✓] Request Teacher Rec #1
│   └── [✓] Request Teacher Rec #2
├── Testing Section (0/1)
│   └── [ ] Send SAT Scores
└── [+ Add Custom Task]
```

**Interactive:**
- Click checkbox → Toggle complete/incomplete
- Each item shows:
  - Category icon
  - Due date
  - Status badge (In Progress)
  - Notes field

---

### 7. Roadmap (`/roadmap`)
**Grade-by-grade action plan**

```
/roadmap
├── Grade Selector
│   ├── [Grade 9] 0/0
│   ├── [Grade 10] 0/0
│   ├── [Grade 11] ← Current (2/6)
│   └── [Grade 12] 0/0
└── Grade 11 Tasks
    ├── 📚 Academics (0 tasks)
    ├── 📝 Testing (1 task)
    │   └── [✓] Begin SAT Preparation
    ├── ⭐ Extracurriculars (0 tasks)
    ├── ☀️ Summer (1 task)
    │   └── [ ] Plan Meaningful Summer Activities
    └── 🎓 Applications (4 tasks)
        ├── [✓] Research Colleges
        ├── [▶] Brainstorm Essay Topics
        ├── [ ] Request Teacher Recommendations
        └── [ ] Finalize College List
```

**Features:**
- Click grade to switch view
- Current grade highlighted
- Category emoji icons
- Status: ✓ Complete, ▶ In Progress, □ Not Started
- Timing windows (Fall, Winter, Spring, Summer)

---

### 8. Deadlines Calendar (`/deadlines`)
**All important dates in one place**

```
/deadlines
├── View Mode Toggle: [Timeline] [Calendar]
├── Filter Chips
│   ├── [All] ← Active
│   ├── [Applications]
│   ├── [Testing]
│   ├── [School-Specific]
│   └── [Milestones]
├── Timeline View
│   ├── November 2025
│   │   └── UC Berkeley - RD Deadline (Nov 30)
│   ├── January 2026
│   │   ├── Boston University - ED2 (Jan 4)
│   │   └── Request Teacher Recs (Jan 1)
│   └── March 2026
│       └── SAT Test Date (Mar 15)
└── "Upcoming This Week" Alert
    └── 1 deadline: BU - ED2 Deadline (4 days)
```

**Features:**
- Grouped by month
- Color-coded by type
- Days-until countdown
- Urgent deadlines highlighted in orange
- Filter by deadline type

---

### 9. Parent Dashboard (`/parent`)
**Read-only overview for parents**

```
/parent
├── Header: "Parent Dashboard" [Read-Only View]
├── Student Profile Card
│   ├── Alex Johnson
│   ├── Grade 11 • Class of 2026
│   └── Lincoln High School
├── Alert Cards
│   ├── 🚨 Upcoming Deadlines (1 in next 7 days)
│   └── ℹ️ Profile Incomplete (80%)
├── Progress Metrics
│   ├── Profile Completeness: 80%
│   ├── College List: 4 schools
│   │   ├── 1 Reach
│   │   ├── 2 Target
│   │   └── 1 Safety
│   └── Grade 11 Roadmap: 33%
├── Academic Summary
│   ├── Unweighted GPA: 3.7
│   ├── Weighted GPA: 4.1
│   ├── AP/Honors Courses: 3
│   └── SAT: 1380
└── Upcoming Milestones (5)
```

**Designed for Parents:**
- No edit capabilities
- Alert system for urgent items
- High-level metrics
- Progress visibility
- Encouraging context

---

## 🔄 Common User Journeys

### Journey 1: New Student Onboarding
```
1. /onboarding (5 steps)
2. Complete profile
3. Redirected to → /dashboard
4. See profile completeness
5. Click [Complete Profile] → /profile
6. Fill in missing data
7. Click [Explore Colleges] → /colleges
```

### Journey 2: College Research
```
1. /colleges (Explorer)
2. Search "Computer Science California"
3. Filter: Type = Public
4. Click "UC Berkeley" card
5. View /colleges/u1 (Detail page)
6. Read match analysis (Reach, Low Confidence)
7. Click [Add to My List]
8. Redirected to /my-colleges
```

### Journey 3: Application Management
```
1. /my-colleges (Saved list)
2. Click [Checklist] on Boston University
3. View /my-colleges/sc2/checklist
4. Check off "Request Teacher Rec #1"
5. Progress updates: 2/6 → 3/6
6. Click [← Back to My Colleges]
7. See updated progress bar
```

### Journey 4: Deadline Tracking
```
1. /deadlines (Calendar)
2. Filter by "Applications"
3. See 2 upcoming deadlines
4. Note urgent deadline (4 days away)
5. Click deadline card
6. (Future: Opens detail/checklist)
```

### Journey 5: Parent Check-In
```
1. /parent (Parent dashboard)
2. See alert: "1 deadline in next 7 days"
3. View student's 80% profile completeness
4. Check college list distribution
5. Review upcoming milestones
6. (Future: Email student/set reminders)
```

---

## 🎨 Visual Navigation Cues

### Color Coding
- **🟠 Orange**: Reach schools, urgent deadlines
- **🟢 Green**: Target schools, completed items
- **🔵 Blue**: Safety schools, informational
- **🟡 Yellow**: In progress items
- **🔴 Red**: Errors, critical alerts

### Badges & Indicators
- **Tier Badges**: Reach/Target/Safety on all college cards
- **Confidence Badges**: Low/Medium/High on match analysis
- **Status Badges**: Not Started/In Progress/Complete
- **Count Badges**: Active filter counts, notification dots

### Progress Indicators
- **Progress Bars**: Profile, checklists, roadmap
- **Percentages**: Numerical completion rates
- **Checkboxes**: Interactive task completion
- **Chips**: Selected filters and categories

---

## 📍 Breadcrumb Examples

```
Dashboard
└── My Colleges
    └── Boston University
        └── Checklist

Dashboard
└── Profile
    └── [Academics Tab]

Dashboard
└── Explore Colleges
    └── Search: "Boston"
        └── Boston University Details
```

---

## 🔗 Quick Access

Every page has header navigation to:
- Dashboard (home)
- Profile (edit)
- Colleges (explore)
- My Colleges (saved)
- Roadmap (tasks)
- Deadlines (calendar)

Mobile users get a hamburger menu with the same links.

---

## 🎯 Key Takeaways

1. **Dashboard is the hub** - Everything connects back
2. **3-click maximum** to reach any feature
3. **Contextual actions** on every page
4. **Tier-based organization** (Reach/Target/Safety)
5. **Progress tracking** visible everywhere
6. **Mobile-responsive** with collapsible menu
7. **Parent view** is read-only with alerts

Navigation is **intuitive, consistent, and action-oriented**. 🚀
