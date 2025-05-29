/**
 * Core data types for the Data Marketplace application
 */

// Listing Types
export type ListingMetadata = {
  niche: string;
  source: string;
  freshness: string;
  exclusivityLevel: string;
}

export type PreviewRecord = {
  name: string;
  title: string;
  company: string;
  email: string;
}

export type ListingStats = {
  rating: number;
  lastSoldCount: number;
  qualityScore: number;
}

export type Listing = {
  id: string;
  title: string;
  description: string;
  metadata: ListingMetadata;
  previewRecords: PreviewRecord[];
  stats: ListingStats;
  status: 'active' | 'pending' | 'rejected';
  price: number;
  requests: number;
  lastUpdated: string;
}

// Seller Dashboard Types
export type Earnings = {
  total: number;
  pending: number;
  lastPayout: {
    date: string;
    amount: number;
  };
}

export type Rating = {
  average: number;
  total: number;
  breakdown: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
}

export type Fulfillment = {
  pending: number;
  completed: number;
  rejected: number;
}

// Buyer Dashboard Types
export type ListRequest = {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  seller: string;
  price: number;
}

export type EnrichmentAddon = {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

export type Download = {
  id: string;
  title: string;
  date: string;
  format: string;
  size: string;
}

// Filter Types
export type FilterState = {
  industry: string[];
  jobTitle: string[];
  volume: string;
  verifiedSellers: boolean;
  listType: string[];
}

// Component Props Types
export type ListingPreviewProps = {
  listing: Listing;
}

export type SearchBarProps = {
  onSearch: (query: string) => void;
}

export type FiltersProps = {
  onFilterChange: (filters: FilterState) => void;
} 