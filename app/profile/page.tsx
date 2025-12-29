'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  mockStudent,
  mockProfile,
  mockCourses,
  mockTestScores,
  mockExtracurriculars,
  mockAchievements,
  mockPreferences,
} from "@/lib/mock-data";
import { Plus, Trash2, Award, BookOpen, FlaskConical, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: 'academics', label: 'Academics', icon: BookOpen },
  { id: 'testing', label: 'Testing', icon: FlaskConical },
  { id: 'activities', label: 'Activities', icon: Star },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'preferences', label: 'Preferences', icon: null },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('academics');

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 md:space-y-10 max-w-7xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Manage your academic profile, test scores, and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-2 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Academics Tab */}
        {activeTab === 'academics' && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>GPA & Class Rank</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gpaUnweighted">Unweighted GPA</Label>
                    <Input
                      id="gpaUnweighted"
                      type="number"
                      step="0.01"
                      defaultValue={mockProfile.gpaUnweighted}
                      placeholder="3.7"
                    />
                    <p className="text-xs text-muted-foreground">On a 4.0 scale</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gpaWeighted">Weighted GPA</Label>
                    <Input
                      id="gpaWeighted"
                      type="number"
                      step="0.01"
                      defaultValue={mockProfile.gpaWeighted}
                      placeholder="4.1"
                    />
                    <p className="text-xs text-muted-foreground">If applicable</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="classRank">Class Rank</Label>
                    <Input
                      id="classRank"
                      defaultValue={mockProfile.classRank}
                      placeholder="Top 15%"
                    />
                    <p className="text-xs text-muted-foreground">If known</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Courses</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-medium">{course.name}</h4>
                          <Badge variant="secondary" className="capitalize">
                            {course.level === 'ap' ? 'AP' :
                             course.level === 'ib' ? 'IB' :
                             course.level}
                          </Badge>
                          {course.grade && (
                            <span className="text-sm text-muted-foreground">
                              Grade: {course.grade}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Year {course.year}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Testing Tab */}
        {activeTab === 'testing' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Test Scores</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Test Score
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTestScores.map((score) => (
                  <div
                    key={score.id}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold uppercase">{score.testType}</h4>
                          {score.planned && (
                            <Badge variant="outline">Planned</Badge>
                          )}
                        </div>
                        {!score.planned && score.composite ? (
                          <div className="mt-2 space-y-1">
                            <p className="text-2xl font-bold">{score.composite}</p>
                            {score.sectionScores && (
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                {Object.entries(score.sectionScores).map(([section, s]) => (
                                  <span key={section} className="capitalize">
                                    {section}: {s}
                                  </span>
                                ))}
                              </div>
                            )}
                            {score.testDate && (
                              <p className="text-sm text-muted-foreground">
                                {new Date(score.testDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">
                            {score.testDate ? `Planned for ${new Date(score.testDate).toLocaleDateString()}` : 'Planned'}
                          </p>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {mockTestScores.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No test scores added yet</p>
                    <p className="text-sm mt-1">Add your SAT, ACT, or AP scores</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Extracurricular Activities</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Activity
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockExtracurriculars.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold">{activity.orgName}</h4>
                          <Badge variant="secondary">{activity.category}</Badge>
                          {activity.leadershipRole && (
                            <Badge variant="outline">{activity.leadershipRole}</Badge>
                          )}
                        </div>
                        {activity.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {activity.description}
                          </p>
                        )}
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{activity.hoursPerWeek} hrs/week</span>
                          <span>
                            Since {new Date(activity.startDate).getFullYear()}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Awards & Achievements</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Achievement
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <Badge
                          variant="outline"
                          className={cn(
                            achievement.level === 'national' || achievement.level === 'international'
                              ? 'border-yellow-500 text-yellow-700'
                              : ''
                          )}
                        >
                          {achievement.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {achievement.year}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <Card>
            <CardHeader>
              <CardTitle>College Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="majors">Intended Major(s)</Label>
                <Input
                  id="majors"
                  defaultValue={mockPreferences.intendedMajorCodes.join(', ')}
                  placeholder="Computer Science, Mathematics"
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple majors with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="regions">Geographic Preferences</Label>
                <Input
                  id="regions"
                  defaultValue={mockPreferences.geoPreferences.join(', ')}
                  placeholder="Northeast, West Coast"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="campusSize">Campus Size</Label>
                  <Select id="campusSize" defaultValue={mockPreferences.campusSize}>
                    <option value="">No preference</option>
                    <option value="small">Small (under 5,000)</option>
                    <option value="medium">Medium (5,000-15,000)</option>
                    <option value="large">Large (15,000+)</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolType">School Type</Label>
                  <Select id="schoolType" defaultValue={mockPreferences.schoolType}>
                    <option value="any">No preference</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Annual Budget Range</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    defaultValue={mockPreferences.budgetRange?.min}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    defaultValue={mockPreferences.budgetRange?.max}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Your budget helps us recommend affordable options
                </p>
              </div>

              <Button className="w-full md:w-auto">Save Preferences</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
