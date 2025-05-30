import { useState, useCallback } from 'react';
import { Listing } from '@/lib/types';
import { mockListings } from '@/lib/mock-data';

export function useListings() {
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setListings(mockListings);
    } catch {
      setError('Failed to fetch listings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchListings = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const filtered = mockListings.filter(listing => 
        listing.title.toLowerCase().includes(query.toLowerCase()) ||
        listing.description.toLowerCase().includes(query.toLowerCase()) ||
        listing.industry.toLowerCase().includes(query.toLowerCase())
      );
      setListings(filtered);
    } catch {
      setError('Failed to search listings');
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
    searchListings,
    createListing,
    updateListing,
    deleteListing,
  };
} 