'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UniversityCard } from "@/components/university-card";
import { mockUniversities, mockBenchmarks, mockSavedColleges } from "@/lib/mock-data";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function CollegesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    state: '',
    type: '',
    size: '',
    region: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredUniversities = mockUniversities.filter((university) => {
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
    if (filters.state && university.state !== filters.state) {
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

  const savedCollegeIds = new Set(mockSavedColleges.map(sc => sc.universityId));

  const clearFilters = () => {
    setFilters({ state: '', type: '', size: '', region: '' });
    setSearchQuery('');
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

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
                onChange={(e) => setSearchQuery(e.target.value)}
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
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="pt-4 border-t">
              <div className="space-y-4 rounded-xl bg-muted/40 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <Select
                    value={filters.state}
                    onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                  >
                    <option value="">All states</option>
                    <option value="CA">California</option>
                    <option value="MA">Massachusetts</option>
                    <option value="WA">Washington</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="NY">New York</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
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
                    onChange={(e) => setFilters({ ...filters, size: e.target.value })}
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
                    onChange={(e) => setFilters({ ...filters, region: e.target.value })}
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
          Showing {filteredUniversities.length} {filteredUniversities.length === 1 ? 'college' : 'colleges'}
          </p>
          {activeFilterCount > 0 && (
            <span className="text-xs font-medium rounded-full bg-secondary text-secondary-foreground px-3 py-1">
              {activeFilterCount} filter{activeFilterCount === 1 ? '' : 's'} applied
            </span>
          )}
        </div>

        {filteredUniversities.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredUniversities.map((university) => (
              <UniversityCard
                key={university.id}
                university={university}
                benchmarks={mockBenchmarks[university.id]}
                isSaved={savedCollegeIds.has(university.id)}
                onSave={() => {
                  // In a real app, this would call an API
                  console.log('Save university:', university.id);
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
    </div>
  );
}
