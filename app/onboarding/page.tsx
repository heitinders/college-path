'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { capitalizeFirst } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Basic Information", description: "Tell us about yourself" },
  { id: 2, title: "Academic Profile", description: "Your grades and courses" },
  { id: 3, title: "Testing", description: "Standardized test scores" },
  { id: 4, title: "Activities", description: "Extracurriculars and achievements" },
  { id: 5, title: "Preferences", description: "College preferences" },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gradeLevel: '',
    gradYear: '',
    highSchool: '',
    gpaUnweighted: '',
    gpaWeighted: '',
    satScore: '',
    actScore: '',
    intendedMajor: '',
    budget: '',
  });

  const router = useRouter();
  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateField = (field: string, value: string) => {
    const normalizedValue = (field === 'firstName' || field === 'lastName')
      ? capitalizeFirst(value)
      : value;
    setFormData(prev => ({ ...prev, [field]: normalizedValue }));
  };

  return (
    <div className="container max-w-3xl px-4 md:px-6 py-8 md:py-12 lg:py-16">
      <div className="space-y-8">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 shadow-luxury">
          <p className="text-sm font-medium text-primary">Let’s get you set up</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient">Student Onboarding</h1>
          <p className="text-muted-foreground text-base">
            A few quick steps so we can personalize your college journey.
          </p>
        </div>

        {/* Progress Header */}
        <div className="space-y-3 rounded-2xl border bg-card/80 p-4 shadow-luxury-sm">
          <div className="flex items-center justify-between text-base text-muted-foreground">
            <span className="font-medium">Step {currentStep} of {STEPS.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2.5" />
        </div>

        {/* Form Card */}
        <Card className="bg-card/90 border-border/70 shadow-luxury">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">{STEPS[currentStep - 1].title}</CardTitle>
            <CardDescription className="text-base">{STEPS[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      placeholder="Alex"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      placeholder="Johnson"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="alex@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gradeLevel">Current Grade *</Label>
                    <Select
                      id="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={(e) => updateField('gradeLevel', e.target.value)}
                    >
                      <option value="">Select grade</option>
                      <option value="9">9th Grade</option>
                      <option value="10">10th Grade</option>
                      <option value="11">11th Grade</option>
                      <option value="12">12th Grade</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gradYear">Graduation Year *</Label>
                    <Input
                      id="gradYear"
                      type="number"
                      value={formData.gradYear}
                      onChange={(e) => updateField('gradYear', e.target.value)}
                      placeholder="2026"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="highSchool">High School Name *</Label>
                  <Input
                    id="highSchool"
                    value={formData.highSchool}
                    onChange={(e) => updateField('highSchool', e.target.value)}
                    placeholder="Lincoln High School"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Academic Profile */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gpaUnweighted">Unweighted GPA</Label>
                    <Input
                      id="gpaUnweighted"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={formData.gpaUnweighted}
                      onChange={(e) => updateField('gpaUnweighted', e.target.value)}
                      placeholder="3.7"
                    />
                    <p className="text-xs text-muted-foreground">On a 4.0 scale</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gpaWeighted">Weighted GPA (if available)</Label>
                    <Input
                      id="gpaWeighted"
                      type="number"
                      step="0.01"
                      min="0"
                      max="5"
                      value={formData.gpaWeighted}
                      onChange={(e) => updateField('gpaWeighted', e.target.value)}
                      placeholder="4.1"
                    />
                    <p className="text-xs text-muted-foreground">On a 5.0 scale</p>
                  </div>
                </div>

                <div className="rounded-lg border border-border/60 bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    You'll be able to add your courses, class rank, and academic details in your profile later.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Testing */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="satScore">SAT Score (if taken)</Label>
                    <Input
                      id="satScore"
                      type="number"
                      min="400"
                      max="1600"
                      value={formData.satScore}
                      onChange={(e) => updateField('satScore', e.target.value)}
                      placeholder="1380"
                    />
                    <p className="text-xs text-muted-foreground">Out of 1600</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="actScore">ACT Score (if taken)</Label>
                    <Input
                      id="actScore"
                      type="number"
                      min="1"
                      max="36"
                      value={formData.actScore}
                      onChange={(e) => updateField('actScore', e.target.value)}
                      placeholder="31"
                    />
                    <p className="text-xs text-muted-foreground">Out of 36</p>
                  </div>
                </div>

                <div className="rounded-lg border border-border/60 bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    Haven't taken these tests yet? No problem! You can add scores later or mark them as planned in your profile.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Activities */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="rounded-lg border border-border/60 bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    We'll help you build a comprehensive list of your extracurricular activities, leadership roles, and achievements in the next section.
                  </p>
                </div>
                <p className="text-sm">
                  For now, we're gathering the basics. You'll have full access to add and manage all your activities from your profile.
                </p>
              </div>
            )}

            {/* Step 5: Preferences */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="intendedMajor">Intended Major(s)</Label>
                  <Input
                    id="intendedMajor"
                    value={formData.intendedMajor}
                    onChange={(e) => updateField('intendedMajor', e.target.value)}
                    placeholder="Computer Science, Mathematics"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate multiple majors with commas
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Annual Budget Range</Label>
                  <Select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => updateField('budget', e.target.value)}
                  >
                    <option value="">Select a range</option>
                    <option value="0-20000">$0 - $20,000</option>
                    <option value="20000-40000">$20,000 - $40,000</option>
                    <option value="40000-60000">$40,000 - $60,000</option>
                    <option value="60000+">$60,000+</option>
                  </Select>
                </div>

                <div className="rounded-lg bg-accent/10 border border-accent/30 p-4">
                  <p className="text-sm text-foreground">
                    You can refine all of these preferences and add more details (location, school size, campus culture, etc.) in your profile settings.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <Button onClick={handleNext}>
            {currentStep === STEPS.length ? (
              "Complete Setup"
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
