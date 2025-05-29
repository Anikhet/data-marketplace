import { useState, useCallback } from 'react';
import { FilterState } from '@/lib/types';

const initialFilterState: FilterState = {
  industry: [],
  jobTitle: [],
  volume: '',
  verifiedSellers: false,
  listType: [],
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [isFiltering, setIsFiltering] = useState(false);

  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  const applyFilters = useCallback(async (listings: any[]) => {
    setIsFiltering(true);
    try {
      // TODO: Replace with actual filtering logic
      const filteredListings = listings.filter(listing => {
        if (filters.industry.length && !filters.industry.includes(listing.industry)) {
          return false;
        }
        if (filters.jobTitle.length && !filters.jobTitle.includes(listing.jobTitle)) {
          return false;
        }
        if (filters.volume && listing.volume !== filters.volume) {
          return false;
        }
        if (filters.verifiedSellers && !listing.isVerified) {
          return false;
        }
        if (filters.listType.length && !filters.listType.includes(listing.type)) {
          return false;
        }
        return true;
      });
      return filteredListings;
    } finally {
      setIsFiltering(false);
    }
  }, [filters]);

  return {
    filters,
    isFiltering,
    updateFilter,
    resetFilters,
    applyFilters,
  };
} 