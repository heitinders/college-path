'use client';

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UniversityCard } from "@/components/university-card";
import { mockBenchmarks } from "@/lib/mock-data";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import type { University } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ALL_STATES = [
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"],
  ["DC", "District of Columbia"],
] as const;

export default function CollegesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [savedCollegeIds, setSavedCollegeIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [onboardingRequired, setOnboardingRequired] = useState(false);
  const [filters, setFilters] = useState({
    state: ALL_STATES.map(([abbr]) => abbr),
    type: '',
    size: '',
    region: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const stateDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!stateDropdownRef.current) return;
      if (stateDropdownRef.current.contains(event.target as Node)) return;
      setIsStateOpen(false);
    };

    if (isStateOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isStateOpen]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchColleges = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.set("search", searchQuery);
        if (filters.state.length > 0 && filters.state.length < ALL_STATES.length) {
          params.set("state", filters.state.join(","));
        }
        if (filters.type) params.set("type", filters.type);
        params.set("page", page.toString());
        params.set("limit", "24");

        const response = await fetch(`/api/colleges?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to load colleges");
        }
        const payload = await response.json();
        setUniversities(payload.data || []);
        setTotalPages(payload.pagination?.totalPages || 1);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Unable to load colleges right now.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchColleges();
    return () => controller.abort();
  }, [searchQuery, filters.state, filters.type, page]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchSaved = async () => {
      try {
        const response = await fetch("/api/saved-colleges", {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const payload = await response.json();
        const ids = (payload.data || []).map((item: { unitId: string }) => item.unitId);
        setSavedCollegeIds(ids);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          return;
        }
      }
    };

    fetchSaved();
    return () => controller.abort();
  }, []);

  const filteredUniversities = universities.filter((university) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        university.name.toLowerCase().includes(query) ||
        university.city.toLowerCase().includes(query) ||
        university.state.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // State filter
    if (
      filters.state.length > 0 &&
      filters.state.length < ALL_STATES.length &&
      !filters.state.includes(university.state)
    ) {
      return false;
    }

    // Type filter
    if (filters.type && university.type !== filters.type) {
      return false;
    }

    // Size filter
    if (filters.size && university.size !== filters.size) {
      return false;
    }

    // Region filter
    if (filters.region && university.region !== filters.region) {
      return false;
    }

    return true;
  });

  const savedCollegeIdSet = new Set(savedCollegeIds);

  const handleSaveCollege = async (university: University) => {
    if (savedCollegeIdSet.has(university.id)) return;
    setIsSaving(university.id);
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
        if (response.status === 409) {
          setOnboardingRequired(true);
        }
        throw new Error(payload.error || "Failed to save college");
      }
      setSavedCollegeIds((prev) =>
        prev.includes(university.id) ? prev : [...prev, university.id]
      );
    } catch (err) {
      setError((err as Error).message || "Unable to save college right now.");
    } finally {
      setIsSaving(null);
    }
  };

  const clearFilters = () => {
    setFilters({ state: ALL_STATES.map(([abbr]) => abbr), type: '', size: '', region: '' });
    setSearchQuery('');
    setPage(1);
  };

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "state") {
      return Array.isArray(value) && value.length > 0 && value.length < ALL_STATES.length;
    }
    return Boolean(value);
  }).length;
  const canGoBack = page > 1;
  const canGoForward = page < totalPages;

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 md:space-y-10 max-w-7xl">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 md:p-8 shadow-luxury">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">Find your best-fit schools</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            Explore Colleges
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Search and discover universities that match your profile
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
        <CardContent className="pt-6 space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, city, or state..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full gap-2 sm:w-auto"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            {page > 1 && (
              <Button
                variant="ghost"
                onClick={() => setPage(1)}
                className="w-full sm:w-auto"
              >
                Reset page
              </Button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="pt-4 border-t">
              <div className="space-y-4 rounded-xl bg-muted/40 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <div className="relative" ref={stateDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsStateOpen((prev) => !prev)}
                      className="flex h-11 w-full items-center justify-between rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:border-ring shadow-apple-sm focus-visible:shadow-apple"
                    >
                      <span>
                        {filters.state.length === 0 || filters.state.length === ALL_STATES.length
                          ? "All states"
                          : `${filters.state.length} states selected`}
                      </span>
                      <ChevronDown className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        isStateOpen && "rotate-180"
                      )} />
                    </button>
                    {isStateOpen && (
                      <div className="absolute z-20 mt-2 w-full rounded-xl border border-border/60 bg-card p-3 shadow-luxury-lg">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>Select states</span>
                        <button
                          type="button"
                          className="text-primary hover:underline"
                          onClick={() => {
                            setFilters((prev) => ({ ...prev, state: ALL_STATES.map(([abbr]) => abbr) }));
                            setPage(1);
                          }}
                        >
                          Select all
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {ALL_STATES.map(([abbr, name]) => {
                          const isSelected = filters.state.includes(abbr);
                          return (
                            <label
                              key={abbr}
                              className={cn(
                                "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all cursor-pointer",
                                isSelected
                                  ? "border-primary/40 bg-primary/10 text-primary"
                                  : "border-border/60 bg-card/80 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                              )}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {
                                  setFilters((prev) => ({
                                    ...prev,
                                    state: isSelected
                                      ? prev.state.filter((item) => item !== abbr)
                                      : [...prev.state, abbr],
                                  }));
                                  setPage(1);
                                }}
                                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                              />
                              <span className="flex-1">{name}</span>
                              <span className="text-[10px] font-semibold uppercase">{abbr}</span>
                            </label>
                          );
                        })}
                      </div>
                      {filters.state.length > 0 && filters.state.length < ALL_STATES.length && (
                        <div className="mt-2 flex items-center justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setFilters((prev) => ({ ...prev, state: ALL_STATES.map(([abbr]) => abbr) }));
                              setPage(1);
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                      )}
                    </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select
                    value={filters.type}
                    onChange={(e) => {
                      setFilters({ ...filters, type: e.target.value });
                      setPage(1);
                    }}
                  >
                    <option value="">All types</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Size</label>
                  <Select
                    value={filters.size}
                    onChange={(e) => {
                      setFilters({ ...filters, size: e.target.value });
                      setPage(1);
                    }}
                  >
                    <option value="">All sizes</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Region</label>
                  <Select
                    value={filters.region}
                    onChange={(e) => {
                      setFilters({ ...filters, region: e.target.value });
                      setPage(1);
                    }}
                  >
                    <option value="">All regions</option>
                    <option value="West Coast">West Coast</option>
                    <option value="Northeast">Northeast</option>
                    <option value="Midwest">Midwest</option>
                    <option value="South">South</option>
                  </Select>
                </div>
              </div>

              {activeFilterCount > 0 && (
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear all filters
                  </Button>
                </div>
              )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? "Loading colleges..."
              : `Showing ${filteredUniversities.length} ${filteredUniversities.length === 1 ? 'college' : 'colleges'}`}
          </p>
          {activeFilterCount > 0 && (
            <span className="text-xs font-medium rounded-full bg-secondary text-secondary-foreground px-3 py-1">
              {activeFilterCount} filter{activeFilterCount === 1 ? '' : 's'} applied
            </span>
          )}
        </div>

      {onboardingRequired && (
        <Card className="bg-accent/10 border-accent/30">
          <CardContent className="py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Complete onboarding to save colleges
              </p>
              <p className="text-xs text-muted-foreground">
                Finish your student profile to add schools to your list.
              </p>
            </div>
            <Button asChild size="sm">
              <Link href="/onboarding">Go to Onboarding</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-card/90 border-border/70 shadow-luxury-sm">
                <CardContent className="p-6">
                  <div className="space-y-4 animate-pulse">
                    <div className="h-5 w-3/4 rounded-md bg-muted" />
                    <div className="h-4 w-1/2 rounded-md bg-muted" />
                    <div className="h-24 rounded-xl bg-muted" />
                    <div className="flex gap-2">
                      <div className="h-8 w-20 rounded-full bg-muted" />
                      <div className="h-8 w-20 rounded-full bg-muted" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
            <CardContent className="py-12 text-center text-muted-foreground">
              {error}
            </CardContent>
          </Card>
        ) : filteredUniversities.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredUniversities.map((university) => (
              <UniversityCard
                key={university.id}
                university={university}
                benchmarks={mockBenchmarks[university.id]}
                isSaved={savedCollegeIdSet.has(university.id)}
                isSaving={isSaving === university.id}
                onSave={() => {
                  handleSaveCollege(university);
                }}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-semibold text-lg mb-2">No colleges found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters
              </p>
              {(searchQuery || activeFilterCount > 0) && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear search and filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && !error && totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card/80 p-4 shadow-luxury-sm">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={!canGoBack}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={!canGoForward}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
