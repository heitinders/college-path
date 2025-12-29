import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, Plus, Check } from "lucide-react";
import type { University, AdmissionsBenchmarks } from "@/types";
import Link from "next/link";

interface UniversityCardProps {
  university: University;
  benchmarks?: AdmissionsBenchmarks;
  isSaved?: boolean;
  onSave?: () => void;
}

export function UniversityCard({
  university,
  benchmarks,
  isSaved,
  onSave
}: UniversityCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div>
            <Link href={`/colleges/${university.id}`}>
              <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                {university.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span>{university.city}, {university.state}</span>
            </div>
          </div>

          {benchmarks && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Acceptance Rate</p>
                <p className="font-semibold">
                  {(benchmarks.acceptanceRate * 100).toFixed(0)}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">SAT Mid-50%</p>
                <p className="font-semibold">
                  {benchmarks.satMid50.low}-{benchmarks.satMid50.high}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
              {university.type === 'public' ? 'Public' : 'Private'}
            </span>
            {university.size && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-secondary-foreground capitalize">
                {university.size}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant={isSaved ? "secondary" : "default"}
          size="sm"
          onClick={onSave}
          className="flex-1"
        >
          {isSaved ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Saved
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Add to My List
            </>
          )}
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/colleges/${university.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
