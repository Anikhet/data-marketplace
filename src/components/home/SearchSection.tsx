'use client';

import { Listing } from '@/lib/types';
import Filters from './Filters';
import SearchBar from '@/components/SearchBar';
import { ListingsGrid } from './ListingsGrid';
import { useState } from 'react';

interface SearchSectionProps {
  filteredListings: Listing[];
  isLoading: boolean;
  isFiltering: boolean;
  onSearch: (query: string) => void;
  onRequestList: (id: string) => Promise<void>;
}

export default function SearchSection({
  filteredListings,
  isLoading,
  isFiltering,
  onSearch,
  onRequestList,
}: SearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Filters />
        </div>
        <div className="lg:col-span-3">
          <div className="space-y-6">
            <SearchBar
              onSearch={handleSearch}
            />
            <ListingsGrid
              listings={filteredListings}
              isLoading={isLoading}
              isFiltering={isFiltering}
              searchQuery={searchQuery}
              activeFilterCount={0}
              onRequestList={onRequestList}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 