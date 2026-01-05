"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import type { University } from "@/types";

interface SaveCollegeButtonProps {
  university: University;
  initialSaved?: boolean;
  onRequireOnboarding?: () => void;
}

export function SaveCollegeButton({
  university,
  initialSaved,
  onRequireOnboarding,
}: SaveCollegeButtonProps) {
  const [isSaved, setIsSaved] = useState(Boolean(initialSaved));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (isSaved || isSaving) return;
    setIsSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/saved-colleges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitId: university.id,
          name: university.name,
          city: university.city,
          state: university.state,
          region: university.region || "Unknown",
          type: university.type,
          size: university.size || null,
          website: university.website,
        }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        if (response.status === 409 && onRequireOnboarding) {
          onRequireOnboarding();
        }
        throw new Error(payload.error || "Failed to save college");
      }
      setIsSaved(true);
    } catch (error) {
      setIsSaved(false);
      setError((error as Error).message || "Unable to save college.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button variant={isSaved ? "secondary" : "default"} onClick={handleSave} disabled={isSaved || isSaving}>
        {isSaving ? (
          "Saving..."
        ) : isSaved ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Saved
          </>
        ) : (
          <>
            <Plus className="h-4 w-4 mr-2" />
            Add to My List
          </>
        )}
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
