'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeadlineCard } from "@/components/deadline-card";
import { mockDeadlines, mockUniversities } from "@/lib/mock-data";
import { Calendar, List } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = 'timeline' | 'calendar';
type FilterType = 'all' | 'application' | 'testing' | 'school_specific' | 'milestone';

export default function DeadlinesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredDeadlines = mockDeadlines
    .filter(d => filter === 'all' || d.type === filter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Group by month for timeline view
  const deadlinesByMonth = filteredDeadlines.reduce((acc, deadline) => {
    const date = new Date(deadline.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    if (!acc[monthKey]) {
      acc[monthKey] = { label: monthLabel, deadlines: [] };
    }
    acc[monthKey].deadlines.push(deadline);
    return acc;
  }, {} as Record<string, { label: string; deadlines: typeof mockDeadlines }>);

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'application', label: 'Applications' },
    { value: 'testing', label: 'Testing' },
    { value: 'school_specific', label: 'School-Specific' },
    { value: 'milestone', label: 'Milestones' },
  ];

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 md:space-y-10 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Deadlines</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Track all your important dates in one place
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('timeline')}
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
              viewMode === 'timeline'
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="h-4 w-4" />
            Timeline
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
              viewMode === 'calendar'
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Calendar className="h-4 w-4" />
            Calendar
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filterOptions.map(option => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              filter === option.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {filteredDeadlines.length > 0 ? (
        viewMode === 'timeline' ? (
          <div className="space-y-10">
            {Object.entries(deadlinesByMonth).map(([monthKey, { label, deadlines }]) => (
              <div key={monthKey} className="space-y-5">
                <h2 className="text-3xl font-bold tracking-tight sticky top-16 bg-background py-2 z-10">
                  {label}
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {deadlines.map(deadline => {
                    const university = deadline.universityId
                      ? mockUniversities.find(u => u.id === deadline.universityId)
                      : undefined;
                    return (
                      <DeadlineCard
                        key={deadline.id}
                        deadline={deadline}
                        universityName={university?.name}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-semibold text-lg mb-2">Calendar View</h3>
              <p className="text-muted-foreground">
                Full calendar view coming soon. Use timeline view for now.
              </p>
              <Button
                variant="outline"
                onClick={() => setViewMode('timeline')}
                className="mt-4"
              >
                Switch to Timeline
              </Button>
            </CardContent>
          </Card>
        )
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-semibold text-lg mb-2">No deadlines found</h3>
            <p className="text-muted-foreground mb-4">
              {filter === 'all'
                ? "You don't have any deadlines yet. Add colleges to your list to see their application deadlines."
                : `No ${filter.replace('_', ' ')} deadlines found. Try a different filter.`}
            </p>
            {filter !== 'all' && (
              <Button variant="outline" onClick={() => setFilter('all')}>
                Show All Deadlines
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upcoming Alerts */}
      {filteredDeadlines.length > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming This Week
            </h3>
            {(() => {
              const now = new Date();
              const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
              const upcomingThisWeek = filteredDeadlines.filter(d => {
                const deadlineDate = new Date(d.date);
                return deadlineDate >= now && deadlineDate <= weekFromNow;
              });

              if (upcomingThisWeek.length === 0) {
                return (
                  <p className="text-sm text-orange-900">
                    No deadlines in the next 7 days. You're all caught up!
                  </p>
                );
              }

              return (
                <ul className="space-y-1 text-sm text-orange-900">
                  {upcomingThisWeek.map(deadline => {
                    const university = deadline.universityId
                      ? mockUniversities.find(u => u.id === deadline.universityId)
                      : undefined;
                    return (
                      <li key={deadline.id} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />
                        <span className="font-medium">{deadline.title}</span>
                        {university && (
                          <span className="text-orange-700">• {university.name}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
