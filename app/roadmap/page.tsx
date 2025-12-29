'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoadmapActionItem } from "@/components/roadmap-action-item";
import { mockRoadmapItems, mockStudent } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const GRADES = [9, 10, 11, 12] as const;

export default function RoadmapPage() {
  const [selectedGrade, setSelectedGrade] = useState<9 | 10 | 11 | 12>(mockStudent.gradeLevel);
  const [items, setItems] = useState(mockRoadmapItems);

  const toggleItem = (itemId: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          status: item.status === 'complete' ? 'not_started' : 'complete'
        };
      }
      return item;
    }));
  };

  const filteredItems = items.filter(item => item.gradeLevel === selectedGrade);

  // Group by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const categoryOrder = ['academics', 'testing', 'extracurriculars', 'summer', 'applications'];
  const categoryLabels: Record<string, string> = {
    academics: 'Academics',
    testing: 'Testing',
    extracurriculars: 'Extracurriculars',
    summer: 'Summer Activities',
    applications: 'Applications',
  };

  const categoryIcons: Record<string, string> = {
    academics: '📚',
    testing: '📝',
    extracurriculars: '⭐',
    summer: '☀️',
    applications: '🎓',
  };

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 md:space-y-10 max-w-7xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Your Roadmap</h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Grade-by-grade action plan for college preparation
        </p>
      </div>

      {/* Grade Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {GRADES.map(grade => {
          const isActive = selectedGrade === grade;
          const isCurrent = grade === mockStudent.gradeLevel;
          const gradeItems = items.filter(i => i.gradeLevel === grade);
          const completedCount = gradeItems.filter(i => i.status === 'complete').length;

          return (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={cn(
                "flex-1 min-w-[120px] p-4 rounded-lg border-2 transition-all text-left",
                isActive
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-transparent bg-card hover:border-border"
              )}
            >
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">Grade {grade}</span>
                {isCurrent && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                    Current
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {completedCount}/{gradeItems.length} completed
              </p>
            </button>
          );
        })}
      </div>

      {/* Roadmap Items */}
      {filteredItems.length > 0 ? (
        <div className="space-y-8">
          {categoryOrder.map(categoryKey => {
            const categoryItems = groupedItems[categoryKey];
            if (!categoryItems || categoryItems.length === 0) return null;

            return (
              <div key={categoryKey} className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
                  <span>{categoryIcons[categoryKey]}</span>
                  {categoryLabels[categoryKey] || categoryKey}
                </h2>
                <div className="space-y-2">
                  {categoryItems.map(item => (
                    <RoadmapActionItem
                      key={item.id}
                      item={item}
                      onToggle={() => toggleItem(item.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No roadmap items for Grade {selectedGrade} yet
            </p>
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            About Your Roadmap
          </h3>
          <div className="space-y-2 text-sm text-blue-900">
            <p>
              Your roadmap is personalized based on your grade level and college goals. Each action is designed to keep you on track for a successful college application.
            </p>
            <p>
              Items are organized by category and timing. Focus on completing current tasks first, but feel free to work ahead if you're ready!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
