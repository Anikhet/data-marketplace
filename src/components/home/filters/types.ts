export interface FilterState {
  industry: string[];
  jobTitle: string[];
  volume: string;
  verifiedSellers: boolean;
  listType: string[];
  priceRange: [number, number];
  freshness: string;
  qualityScore: number;
  location: string[];
  companySize: string[];
  seniority: string[];
  lastUpdated: string;
  exclusivityLevel: string[];
}

export interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
} 