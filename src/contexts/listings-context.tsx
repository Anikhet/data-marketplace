'use client';

import { createContext, useContext, useCallback, useState, useEffect, ReactNode } from 'react';
import { Listing } from '@/lib/types';
import { useListings } from '@/hooks/useListings';
import { toast } from 'sonner';

interface ListingsContextType {
  listings: Listing[];
  filteredListings: Listing[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  applyFilters: (filters: FilterState) => void;
  handleRequestList: (id: string) => Promise<void>;
  activeFilters: FilterState;
}

export interface FilterState {
  industry: string[];
  jobTitle: string[];
  volume: string;
  verifiedSellers: boolean;
  listType: string[];
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { listings, isLoading, fetchListings } = useListings();
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    industry: [],
    jobTitle: [],
    volume: 'any',
    verifiedSellers: false,
    listType: [],
  });

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  useEffect(() => {
    setFilteredListings(listings);
  }, [listings]);

  // Update filtered listings whenever listings, search query, or filters change
  useEffect(() => {
    let filtered = listings;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const searchTerms = query.split(/\s+/);

      filtered = filtered.filter(listing => {
        const searchableText = [
          listing.title,
          listing.description,
          listing.industry,
          listing.jobTitle,
          listing.seller.name,
          listing.type,
          listing.volume,
          // listing.isVerified
        ].map(text => String(text).toLowerCase()).join(' ');

        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Apply other filters
    filtered = filtered.filter(listing => {
      const matchesIndustry = activeFilters.industry.length === 0 || 
        activeFilters.industry.includes(listing.industry);
      const matchesJobTitle = activeFilters.jobTitle.length === 0 || 
        activeFilters.jobTitle.includes(listing.jobTitle);
      const matchesVolume = activeFilters.volume === 'any' || 
        listing.volume === activeFilters.volume;
      const matchesType = activeFilters.listType.length === 0 || 
        activeFilters.listType.includes(listing.type);


      return matchesIndustry && matchesJobTitle && matchesVolume && 
        matchesType;
    });

    setFilteredListings(filtered);
  }, [searchQuery, listings, activeFilters]);

  const applyFilters = useCallback((filters: FilterState) => {
    setActiveFilters(filters);
  }, []);

  const handleRequestList = useCallback(async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success(`List ${id} requested successfully`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to request list';
      toast.error(message);
    }
  }, []);

  return (
    <ListingsContext.Provider value={{
      listings,
      filteredListings,
      isLoading,
      searchQuery,
      setSearchQuery,
      applyFilters,
      handleRequestList,
      activeFilters,
    }}>
      {children}
    </ListingsContext.Provider>
  );
}

export function useListingsContext() {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error('useListingsContext must be used within a ListingsProvider');
  }
  return context;
} 