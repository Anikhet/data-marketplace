'use client';

import { createContext, useContext, ReactNode } from 'react';

interface DashboardStats {
  totalListings: number;
  activeRequests: number;
  completedRequests: number;
  revenue: number;
}

interface ListingRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  date: string;
  price: number;
  buyer?: {
    name: string;
    email: string;
  };
}

interface DashboardContextType {
  buyerStats: DashboardStats;
  sellerStats: DashboardStats;
  recentRequests: ListingRequest[];
  recentListings: ListingRequest[];
}

const dummyBuyerStats: DashboardStats = {
  totalListings: 24,
  activeRequests: 5,
  completedRequests: 12,
  revenue: 0,
};

const dummySellerStats: DashboardStats = {
  totalListings: 8,
  activeRequests: 3,
  completedRequests: 15,
  revenue: 4500,
};

const dummyRequests: ListingRequest[] = [
  {
    id: '1',
    listingId: '101',
    listingTitle: 'Tech Companies Email List',
    status: 'pending',
    date: '2024-03-15',
    price: 299,
    buyer: {
      name: 'John Smith',
      email: 'john@example.com',
    },
  },
  {
    id: '2',
    listingId: '102',
    listingTitle: 'Healthcare Professionals Database',
    status: 'approved',
    date: '2024-03-14',
    price: 499,
    buyer: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
    },
  },
  {
    id: '3',
    listingId: '103',
    listingTitle: 'Finance Industry Contacts',
    status: 'completed',
    date: '2024-03-13',
    price: 399,
    buyer: {
      name: 'Mike Brown',
      email: 'mike@example.com',
    },
  },
];

const dummyListings: ListingRequest[] = [
  {
    id: '1',
    listingId: '201',
    listingTitle: 'Tech Companies Email List',
    status: 'approved',
    date: '2024-03-15',
    price: 299,
  },
  {
    id: '2',
    listingId: '202',
    listingTitle: 'Healthcare Professionals Database',
    status: 'pending',
    date: '2024-03-14',
    price: 499,
  },
  {
    id: '3',
    listingId: '203',
    listingTitle: 'Finance Industry Contacts',
    status: 'completed',
    date: '2024-03-13',
    price: 399,
  },
];

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  return (
    <DashboardContext.Provider
      value={{
        buyerStats: dummyBuyerStats,
        sellerStats: dummySellerStats,
        recentRequests: dummyRequests,
        recentListings: dummyListings,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
} 