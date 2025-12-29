# CollegePath

A comprehensive college-readiness platform for high school students (grades 9-12), parents, and counselors.

## Features

### For Students
- **Onboarding Flow**: Multi-step form to capture academic profile, test scores, activities, and preferences
- **Dashboard**: Personalized hub showing profile completeness, saved colleges, and upcoming deadlines
- **Profile Management**: Tabbed interface to manage academics, testing, extracurriculars, achievements, and preferences
- **College Explorer**: Searchable, filterable database of universities with detailed information
- **School Detail Pages**: Comprehensive view with admissions benchmarks, requirements, deadlines, and match analysis
- **My Colleges**: Organized list of saved schools grouped by tier (Reach/Target/Safety)
- **Checklists**: Per-school application tracking with tasks grouped by category
- **Roadmap**: Grade-by-grade action plan with categorized tasks
- **Deadlines Calendar**: Timeline view of all important dates

### For Parents
- **Read-Only Dashboard**: Overview of student progress, college list, and upcoming milestones
- **Alert System**: Highlights urgent deadlines and incomplete profile sections
- **Progress Tracking**: Visual metrics for profile completeness and roadmap progress

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom shadcn/ui-inspired components

## Design Principles

- Mobile-first, responsive design
- Clarity over cleverness
- Action over information
- Minimal cognitive load
- Transparent reasoning (match analysis shows "why")
- Encouraging, supportive tone
- WCAG AA accessible

## Project Structure

```
collegepath/
├── app/                          # Next.js app directory
│   ├── colleges/                 # College explorer & detail pages
│   │   └── [id]/                 # Dynamic school detail routes
│   ├── dashboard/                # Student dashboard
│   ├── deadlines/                # Deadlines calendar
│   ├── my-colleges/              # Saved colleges list
│   │   └── [id]/checklist/       # School-specific checklists
│   ├── onboarding/               # Multi-step onboarding
│   ├── parent/                   # Parent dashboard
│   ├── profile/                  # Profile management
│   ├── roadmap/                  # Grade-based roadmap
│   ├── layout.tsx                # Root layout with header
│   ├── page.tsx                  # Root page (redirects to dashboard)
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # Base UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   └── textarea.tsx
│   ├── checklist-item.tsx        # Checklist task component
│   ├── confidence-badge.tsx      # Match confidence indicator
│   ├── deadline-card.tsx         # Deadline display card
│   ├── header.tsx                # Main app header
│   ├── match-rationale-panel.tsx # Match analysis display
│   ├── navigation.tsx            # Main navigation
│   ├── profile-completeness-card.tsx
│   ├── roadmap-action-item.tsx   # Roadmap task component
│   ├── tier-badge.tsx            # Reach/Target/Safety badge
│   └── university-card.tsx       # College card component
├── lib/                          # Utilities and data
│   ├── mock-data.ts              # Mock data for all features
│   └── utils.ts                  # Helper functions
├── types/                        # TypeScript definitions
│   └── index.ts                  # All type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd collegepath
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The app will automatically redirect to `/dashboard` (in a production app, this would check authentication status).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Routes

- `/` - Landing page (redirects to dashboard)
- `/onboarding` - Multi-step onboarding flow
- `/dashboard` - Student dashboard home
- `/profile` - Profile management with tabs
- `/colleges` - College explorer with search/filter
- `/colleges/[id]` - School detail page
- `/my-colleges` - Saved colleges list
- `/my-colleges/[id]/checklist` - School-specific checklist
- `/roadmap` - Grade-based roadmap
- `/deadlines` - Deadlines calendar
- `/parent` - Parent dashboard (read-only)

## Data Model

The application uses TypeScript interfaces for type safety. Key types include:

- **Student**: Basic student information
- **StudentProfile**: Academic profile (GPA, courses, etc.)
- **Course**: Individual course data
- **TestScore**: Standardized test scores
- **Extracurricular**: Activities and involvement
- **Achievement**: Awards and honors
- **University**: College information
- **AdmissionsBenchmarks**: Admissions statistics
- **MatchResult**: Match tier, confidence, and rationale
- **SavedCollege**: Student's saved schools
- **ChecklistItem**: Application task tracking
- **RoadmapItem**: Grade-level action items
- **Deadline**: Important dates

See `types/index.ts` for complete type definitions.

## Mock Data

All features currently use mock data defined in `lib/mock-data.ts`. This includes:

- Sample student profile
- 8 universities with benchmarks
- Match results with tiers and analysis
- Application checklists
- Grade-level roadmap items
- Deadlines and milestones

Replace with real API calls when backend is ready.

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize colors:

- **Tier colors**: `reach` (orange), `target` (green), `safety` (blue)
- **UI colors**: Defined in CSS variables in `app/globals.css`

### Mock Data

Edit `lib/mock-data.ts` to customize sample data:

- Add more universities
- Change student information
- Modify match results
- Update roadmap items

## Next Steps

When connecting to a real backend:

1. Replace mock data imports with API calls
2. Add authentication (student/parent login)
3. Implement form submission handlers
4. Add data persistence
5. Enable real-time updates for checklists
6. Implement notification system
7. Add PDF export for reports
8. Build counselor dashboard (Phase 2)

## Accessibility

- Semantic HTML throughout
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast color ratios
- Responsive text sizing
- Focus indicators

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - All rights reserved
