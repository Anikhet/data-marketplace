import { useState, useCallback } from 'react';
import { Listing } from '@/lib/types';

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/listings');
      if (!response.ok) throw new Error('Failed to fetch listings');
      const data = await response.json();
      setListings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createListing = useCallback(async (listing: Omit<Listing, 'id'>) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listing),
      });
      if (!response.ok) throw new Error('Failed to create listing');
      const newListing = await response.json();
      setListings(prev => [...prev, newListing]);
      return newListing;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateListing = useCallback(async (id: string, updates: Partial<Listing>) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/listings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update listing');
      const updatedListing = await response.json();
      setListings(prev => prev.map(listing => 
        listing.id === id ? updatedListing : listing
      ));
      return updatedListing;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteListing = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete listing');
      setListings(prev => prev.filter(listing => listing.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    listings,
    isLoading,
    error,
    fetchListings,
    createListing,
    updateListing,
    deleteListing,
  };
} 