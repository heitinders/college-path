'use client';

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeadlineCard } from "@/components/deadline-card";
import { mockDeadlines, mockUniversities } from "@/lib/mock-data";
import { Calendar, ChevronLeft, ChevronRight, List } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = 'timeline' | 'calendar';
type FilterType = 'all' | 'application' | 'testing' | 'school_specific' | 'milestone';

export default function DeadlinesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [filter, setFilter] = useState<FilterType>('all');
  const [calendarDate, setCalendarDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

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

  const deadlinesByDay = useMemo(() => {
    const map = new Map<string, typeof mockDeadlines>();
    filteredDeadlines.forEach((deadline) => {
      const date = new Date(deadline.date);
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const existing = map.get(key) || [];
      existing.push(deadline);
      map.set(key, existing);
    });
    return map;
  }, [filteredDeadlines]);

  const monthLabel = calendarDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  const monthStart = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
  const startDayIndex = monthStart.getDay();
  const totalCells = 42;
  const calendarCells = Array.from({ length: totalCells }, (_, index) => {
    const cellDate = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      index - startDayIndex + 1
    );
    return {
      date: cellDate,
      inMonth: cellDate.getMonth() === calendarDate.getMonth(),
      isToday: cellDate.toDateString() === new Date().toDateString(),
    };
  });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const selectedKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;
  const selectedDeadlines = deadlinesByDay.get(selectedKey) || [];
  const selectedLabel = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 md:space-y-10 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 md:p-8 shadow-luxury">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">Keep every date in sight</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">Deadlines</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Track all your important dates in one place
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/60 bg-card/80 p-1.5 shadow-luxury-sm">
          <button
            onClick={() => setViewMode('timeline')}
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
              viewMode === 'timeline'
                ? "bg-primary text-primary-foreground shadow-luxury-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            <List className="h-4 w-4" />
            Timeline
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
              viewMode === 'calendar'
                ? "bg-primary text-primary-foreground shadow-luxury-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
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
              "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors",
              filter === option.value
                ? "bg-primary text-primary-foreground shadow-luxury-sm"
                : "bg-card/80 text-muted-foreground border border-border/60 hover:text-foreground hover:bg-muted/60"
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
                <h2 className="text-3xl font-semibold tracking-tight sticky top-16 bg-background/80 backdrop-blur py-2 z-10">
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
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
            <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
              <CardContent className="space-y-6 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCalendarDate(
                          new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1)
                        )
                      }
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div>
                      <h3 className="text-lg font-semibold">{monthLabel}</h3>
                      <p className="text-sm text-muted-foreground">
                        {filteredDeadlines.length} total deadline{filteredDeadlines.length === 1 ? '' : 's'}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCalendarDate(
                          new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1)
                        )
                      }
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const today = new Date();
                      setCalendarDate(today);
                      setSelectedDate(today);
                    }}
                  >
                    Today
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-xs text-muted-foreground">
                  {weekDays.map((day) => (
                    <div key={day} className="px-2 py-1 text-center font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarCells.map(({ date, inMonth, isToday }) => {
                    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                    const dayDeadlines = deadlinesByDay.get(key) || [];
                    const visibleDeadlines = dayDeadlines.slice(0, 2);
                    const remainingCount = dayDeadlines.length - visibleDeadlines.length;
                    const isSelected = key === selectedKey;
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "min-h-[110px] rounded-xl border border-border/60 bg-card/80 p-2 text-left shadow-luxury-sm transition-colors hover:bg-muted/40",
                          !inMonth && "bg-muted/30 text-muted-foreground",
                          isToday && "ring-1 ring-primary/40",
                          isSelected && "border-primary/40 bg-primary/10"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className={cn("text-sm font-semibold", !inMonth && "text-muted-foreground")}>
                            {date.getDate()}
                          </span>
                          {dayDeadlines.length > 0 && (
                            <span className="text-xs rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                              {dayDeadlines.length}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 space-y-1 text-xs">
                          {visibleDeadlines.map((deadline) => (
                            <div key={deadline.id} className="flex items-start gap-1">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                              <span className="text-foreground leading-snug">{deadline.title}</span>
                            </div>
                          ))}
                          {remainingCount > 0 && (
                            <span className="text-xs text-muted-foreground">
                              +{remainingCount} more
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
              <CardContent className="space-y-4 p-6">
                <div>
                  <p className="text-sm font-medium text-primary">Selected Day</p>
                  <h4 className="text-lg font-semibold">{selectedLabel}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedDeadlines.length} deadline{selectedDeadlines.length === 1 ? '' : 's'}
                  </p>
                </div>

                {selectedDeadlines.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDeadlines.map((deadline) => {
                      const university = deadline.universityId
                        ? mockUniversities.find(u => u.id === deadline.universityId)
                        : undefined;
                      return (
                        <div key={deadline.id} className="rounded-lg border border-border/60 bg-muted/40 p-3">
                          <p className="text-sm font-semibold text-foreground">{deadline.title}</p>
                          {university && (
                            <p className="text-xs text-muted-foreground">{university.name}</p>
                          )}
                          <p className="text-xs text-muted-foreground capitalize mt-1">
                            {deadline.type.replace('_', ' ')}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No deadlines on this day. Pick another date to explore.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )
      ) : (
        <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
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
        <Card className="bg-accent/10 border-accent/30">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
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
                  <p className="text-sm text-foreground">
                    No deadlines in the next 7 days. You're all caught up!
                  </p>
                );
              }

              return (
                <ul className="space-y-1 text-sm text-foreground">
                  {upcomingThisWeek.map(deadline => {
                    const university = deadline.universityId
                      ? mockUniversities.find(u => u.id === deadline.universityId)
                      : undefined;
                    return (
                      <li key={deadline.id} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="font-medium">{deadline.title}</span>
                        {university && (
                          <span className="text-muted-foreground">• {university.name}</span>
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
