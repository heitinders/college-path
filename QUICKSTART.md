# CollegePath - Quick Start Guide

## Running the Application

1. **Start the development server:**
   ```bash
   cd collegepath
   npm run dev
   ```

2. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **The app will automatically redirect to the dashboard.**

## Exploring the Application

### Main Navigation

Use the header navigation to explore all features:

- **Dashboard** - Main hub with overview
- **Profile** - Manage academic info, test scores, activities
- **Explore** - Search and filter colleges
- **My Colleges** - View saved schools with checklists
- **Roadmap** - Grade-by-grade action plan
- **Deadlines** - Timeline of important dates

### Feature Walkthrough

#### 1. Onboarding Flow
- Visit `/onboarding` to see the 5-step setup process
- Multi-step form with progress indicator
- Includes basic info, academics, testing, activities, and preferences

#### 2. Student Dashboard (`/dashboard`)
- Profile completeness card with suggestions
- Saved colleges summary with tier breakdown
- Upcoming deadlines (next 30 days)
- Current roadmap tasks preview
- Quick action buttons

#### 3. Profile Management (`/profile`)
- **Academics tab**: GPA, courses by level (AP/Honors/Regular)
- **Testing tab**: SAT, ACT, AP scores (actual and planned)
- **Activities tab**: Extracurriculars with leadership roles
- **Achievements tab**: Awards by level (school to international)
- **Preferences tab**: Major, location, budget, school type

#### 4. College Explorer (`/colleges`)
- Search by name, city, or state
- Filter by:
  - State
  - Type (Public/Private)
  - Size (Small/Medium/Large)
  - Region
- Each college card shows:
  - Acceptance rate
  - SAT mid-50% range
  - Quick "Add to My List" action
  - Link to detailed view

#### 5. School Detail Page (`/colleges/[id]`)
Example: `/colleges/u2` for Boston University

- **Admissions Profile**: Acceptance rate, GPA range, test score ranges
- **Test Policy**: Required/Optional/Blind
- **Requirements**: Essays, recommendation letters, interviews
- **Application Deadlines**: EA, ED, ED2, RD with dates
- **Match Analysis Panel**:
  - Tier badge (Reach/Target/Safety)
  - Confidence level (Low/Medium/High)
  - Rationale bullets explaining the match
  - Gap analysis with improvement suggestions
- "Add to My List" or "View Checklist" if already saved

#### 6. My Colleges (`/my-colleges`)
- Organized by tier with color-coded badges:
  - 🟠 Reach (orange)
  - 🟢 Target (green)
  - 🔵 Safety (blue)
- Each card shows:
  - Application progress bar
  - Next deadline
  - Quick links to checklist and details

#### 7. School Checklist (`/my-colleges/[id]/checklist`)
Example: `/my-colleges/sc2/checklist`

- Overall progress indicator
- Tasks grouped by category:
  - Application
  - Essays
  - Recommendations
  - Testing
  - Interviews
  - Supplements
- Interactive checkboxes
- Due dates and notes per item
- Add custom tasks

#### 8. Roadmap (`/roadmap`)
- Toggle between grades 9, 10, 11, 12
- Current grade highlighted
- Tasks organized by category:
  - 📚 Academics
  - 📝 Testing
  - ⭐ Extracurriculars
  - ☀️ Summer Activities
  - 🎓 Applications
- Each task shows:
  - Title and description
  - Timing window (Fall/Winter/Spring/Summer)
  - Status (Not Started/In Progress/Complete)
  - Due date if applicable

#### 9. Deadlines Calendar (`/deadlines`)
- Timeline view grouped by month
- Filter by type:
  - All
  - Applications
  - Testing
  - School-Specific
  - Milestones
- Color-coded deadline cards
- "Upcoming This Week" alert section
- Shows days until deadline

#### 10. Parent Dashboard (`/parent`)
Read-only overview including:
- Student profile summary
- Alert cards for:
  - Urgent deadlines (within 7 days)
  - Incomplete profile (< 80%)
- Progress metrics:
  - Profile completeness
  - College list distribution
  - Current grade roadmap progress
- Academic summary (GPA, test scores, AP courses)
- Upcoming milestones

## Mock Data

The application uses realistic mock data including:

- **Student**: Alex Johnson, Grade 11, Class of 2026
- **8 Universities**: Mix of public/private, various regions
- **Match Results**: 1 Reach, 2 Target, 1 Safety
- **4 Saved Colleges**: With varied application progress
- **Test Scores**: SAT 1380, PSAT 1310, planned retake
- **Activities**: Math Club VP, Food Bank volunteer, Soccer captain
- **Achievements**: National Merit, State Math 3rd place, AP Scholar
- **Deadlines**: Multiple upcoming application and testing dates
- **Roadmap**: Grade 11 tasks across all categories

All data can be found in `lib/mock-data.ts`.

## Key Features to Demonstrate

### 1. Match Analysis Intelligence
Visit any school detail page to see:
- Tier classification based on student profile
- Confidence level
- Specific rationale bullets
- Personalized improvement suggestions

### 2. Profile Completeness Tracking
- Dashboard shows overall percentage
- Lists missing fields
- Direct link to complete profile

### 3. Deadline Management
- Cards show "days until" countdown
- Urgent deadlines highlighted in orange
- Parent dashboard alerts for upcoming items

### 4. Progress Tracking
- Checklist completion percentage
- Roadmap tasks by grade
- Visual progress bars throughout

### 5. Responsive Design
- Resize browser to see mobile navigation
- Hamburger menu on small screens
- Grid layouts adapt to screen size
- Touch-friendly controls

### 6. Tier-Based Organization
Color-coded system throughout:
- 🟠 **Reach**: Schools that are challenging admits
- 🟢 **Target**: Good probability schools
- 🔵 **Safety**: High probability schools

## Customizing Mock Data

To change the mock student or add more colleges:

1. Open `lib/mock-data.ts`
2. Modify exports:
   - `mockStudent` - Basic student info
   - `mockProfile` - GPA and academic profile
   - `mockUniversities` - Add more schools
   - `mockBenchmarks` - Add admissions data
   - `mockMatchResults` - Define tier and analysis
3. Restart dev server to see changes

## Design Highlights

- **Mobile-first**: All screens optimized for phone/tablet
- **Action-oriented**: CTAs on every page
- **Supportive tone**: Encouraging messaging throughout
- **Transparent**: Match analysis explains "why"
- **Minimal cognitive load**: Clean, focused UI
- **Accessible**: High contrast, semantic HTML, keyboard nav

## Common Issues

**Port already in use?**
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

**Module not found?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Styles not loading?**
```bash
# Rebuild Tailwind
npm run dev
```

## Next Steps

1. **Connect to Backend**: Replace mock data with API calls
2. **Add Authentication**: Implement student/parent login
3. **Form Persistence**: Save onboarding and profile edits
4. **Real-time Updates**: WebSocket for collaborative features
5. **Notifications**: Email/push for deadline reminders
6. **Export Features**: PDF reports for college lists
7. **Search Enhancement**: Fuzzy search, advanced filters
8. **Counselor Portal**: Multi-student management (Phase 2)

## Questions?

Review the main [README.md](README.md) for:
- Complete project structure
- Type definitions
- All available routes
- Customization options

Happy exploring! 🎓
