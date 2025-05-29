'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { FilterState } from '@/components/Filters';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    industry: [],
    jobTitle: [],
    volume: 'any',
    verifiedSellers: false,
    listType: [],
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search logic
    console.log('Search query:', query);
  };

  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters);
    // TODO: Implement filter logic
    console.log('Active filters:', filters);
  };

  const getActiveFilterCount = () => {
    return (
      activeFilters.industry.length +
      activeFilters.jobTitle.length +
      (activeFilters.volume ? 1 : 0) +
      (activeFilters.verifiedSellers ? 1 : 0) +
      activeFilters.listType.length
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-card">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Data Marketplace
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-muted-foreground">
              Find and request high-quality business data lists from verified sellers
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Filters onFilterChange={handleFilterChange} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Lists'}
                  </CardTitle>
                  {getActiveFilterCount() > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {getActiveFilterCount()} active filters
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Sample List Card */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Tech Company Executives</h3>
                        <span className="text-sm text-muted-foreground">5,000 records</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Verified C-level executives from Fortune 500 tech companies
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-sm">4.8 (120)</span>
                        </div>
                        <Button>Request List</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Add more sample cards here */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
