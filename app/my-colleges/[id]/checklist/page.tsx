'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChecklistItem } from "@/components/checklist-item";
import { mockUniversities, mockChecklistItems } from "@/lib/mock-data";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ChecklistPage({ params }: { params: { id: string } }) {
  // In a real app, we'd find the saved college by ID
  // For now, we'll use the first saved college (Boston University)
  const university = mockUniversities.find(u => u.id === 'u2');

  if (!university) {
    notFound();
  }

  const [items, setItems] = useState(mockChecklistItems);

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

  // Group items by type
  const groupedItems = items.reduce((acc, item) => {
    const type = item.itemType;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const completedCount = items.filter(i => i.status === 'complete').length;
  const progressPercent = (completedCount / items.length) * 100;

  const sectionOrder = ['application', 'essay', 'recommendation', 'testing', 'interview', 'supplement'];
  const sectionLabels: Record<string, string> = {
    application: 'Application',
    essay: 'Essays',
    recommendation: 'Recommendations',
    testing: 'Testing',
    interview: 'Interviews',
    supplement: 'Supplements',
  };

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 md:space-y-10 max-w-7xl">
      {/* Header */}
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/my-colleges">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Colleges
          </Link>
        </Button>

        <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 md:p-8 shadow-luxury">
          <p className="text-sm font-medium text-primary">Application checklist</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">{university.name}</h1>
          <p className="text-muted-foreground text-base md:text-lg">Track every requirement in one place</p>
        </div>

        {/* Overall Progress */}
        <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Overall Progress</span>
                <span className="text-muted-foreground">
                  {completedCount} of {items.length} completed
                </span>
              </div>
              <Progress value={progressPercent} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {progressPercent === 100
                  ? "Application complete! Ready to submit."
                  : `${Math.round(progressPercent)}% complete - Keep going!`}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-8">
        {sectionOrder.map(sectionKey => {
          const sectionItems = groupedItems[sectionKey];
          if (!sectionItems || sectionItems.length === 0) return null;

          const sectionCompleted = sectionItems.filter(i => i.status === 'complete').length;
          const sectionTotal = sectionItems.length;

          return (
            <Card key={sectionKey} className="bg-card/90 border-border/70 shadow-luxury-sm">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {sectionLabels[sectionKey] || sectionKey}
                  </CardTitle>
                  <span className="text-base text-muted-foreground font-medium">
                    {sectionCompleted}/{sectionTotal}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 p-6 pt-0">
                {sectionItems.map(item => (
                  <ChecklistItem
                    key={item.id}
                    item={item}
                    onToggle={() => toggleItem(item.id)}
                  />
                ))}
              </CardContent>
            </Card>
          );
        })}

        {/* Add Custom Item */}
        <Card className="border-dashed bg-card/80">
          <CardContent className="pt-6">
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Task
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card className="bg-accent/10 border-accent/30">
        <CardHeader>
          <CardTitle className="text-xl">Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-base text-foreground">
          <p>• Start your essays early and have multiple people review them</p>
          <p>• Request recommendation letters at least 4 weeks before deadlines</p>
          <p>• Double-check all requirements on the official university website</p>
          <p>• Keep copies of everything you submit</p>
        </CardContent>
      </Card>
    </div>
  );
}
