

import Filters from "../filters";
import SearchBar from "../SearchBar";
// import SearchBar from "@/components/search-bar";
import { ListingsGrid } from "./ListingsGrid";
import { useListingsContext } from "@/contexts/listings-context";

export default function SearchSection() {
  const { 
    filteredListings, 
    isLoading, 
    searchQuery, 
    setSearchQuery, 
    applyFilters, 
    handleRequestList,
    activeFilters
  } = useListingsContext();

  const activeFilterCount = Object.values(activeFilters).reduce((count, value) => {
    if (Array.isArray(value)) {
      return count + value.length;
    }
    if (typeof value === 'boolean' && value) {
      return count + 1;
    }
    if (typeof value === 'string' && value !== 'any') {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  ">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters column */}
        <div className="lg:col-span-1">
          <Filters onFilterChange={applyFilters} />
        </div>

        {/* Right column: SearchBar above ListingsGrid */}
        <div className="lg:col-span-3 flex flex-col space-y-6">
          <SearchBar onSearch={setSearchQuery} />
          <ListingsGrid
            listings={filteredListings}
            isLoading={isLoading}
            isFiltering={activeFilterCount > 0}
            searchQuery={searchQuery}
            activeFilterCount={activeFilterCount}
            onRequestList={handleRequestList}
          />
        </div>
      </div>
    </div>
  );
}
