'use client';

import { useState, useCallback, useEffect } from 'react';
import { useListings } from '@/hooks/useListings';
import { useFilters } from '@/hooks/useFilters';
import { toast } from 'sonner';
import { Listing } from '@/lib/types';
import { HeroSection } from './home/HeroSection';
import SearchSection from './home/SearchSection';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const { listings, isLoading, error, fetchListings, searchListings } = useListings();
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);
  const { isFiltering } = useFilters();

  // Initialize filteredListings when listings change
  useEffect(() => {
    setFilteredListings(listings);
  }, [listings]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setFilteredListings(listings);
      return;
    }
    try {
      await searchListings(query);
      setFilteredListings(listings);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to search listings';
      toast.error(message);
      setFilteredListings(listings);
    }
  }, [listings, searchListings]);

  const handleRequestList = useCallback(async (listingId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success(`List ${listingId} requested successfully`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to request list';
      toast.error(message);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}
        <SearchSection
          filteredListings={filteredListings}
          isLoading={isLoading}
          isFiltering={isFiltering}
          onSearch={handleSearch}
          onRequestList={handleRequestList}
        />
      </div>
    </div>
  );
}
