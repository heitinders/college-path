import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, Plus, Check } from "lucide-react";
import type { University, AdmissionsBenchmarks } from "@/types";
import Link from "next/link";

interface UniversityCardProps {
  university: University;
  benchmarks?: AdmissionsBenchmarks;
  isSaved?: boolean;
  isSaving?: boolean;
  onSave?: () => void;
}

export function UniversityCard({
  university,
  benchmarks,
  isSaved,
  isSaving,
  onSave
}: UniversityCardProps) {
  return (
    <Card className="overflow-hidden border border-border/60 bg-card/90 shadow-luxury-sm hover:shadow-luxury-lg hover:-translate-y-0.5 transition-all">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary/60 via-accent/60 to-primary/40" />
      <CardContent className="p-6">
        <div className="space-y-5">
          <div>
            <Link href={`/colleges/${university.id}`}>
              <h3 className="font-semibold text-xl hover:text-primary transition-colors">
                {university.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
              <MapPin className="h-4 w-4" />
              <span>{university.city}, {university.state}</span>
            </div>
          </div>

          {benchmarks && (
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Acceptance Rate</p>
                <p className="font-semibold text-lg text-foreground">
                  {(benchmarks.acceptanceRate * 100).toFixed(0)}%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">SAT Mid-50%</p>
                <p className="font-semibold text-lg text-foreground">
                  {benchmarks.satMid50.low}-{benchmarks.satMid50.high}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2.5 text-sm">
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-muted/40 text-foreground border border-border/40">
              {university.type === 'public' ? 'Public' : 'Private'}
            </span>
            {university.size && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-muted/40 text-foreground border border-border/40 capitalize">
                {university.size}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 p-6 pt-0 sm:flex-row">
        <Button
          variant={isSaved ? "secondary" : "default"}
          onClick={onSave}
          className="w-full flex-1 gap-2"
          disabled={isSaved || isSaving}
        >
          {isSaving ? (
            <>Saving...</>
          ) : isSaved ? (
            <>
              <Check className="h-4 w-4" />
              Saved
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add to My List
            </>
          )}
        </Button>
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link href={`/colleges/${university.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
