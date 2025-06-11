'use client';

import { useEffect, useState } from 'react';
import { Listing } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';
import ListingPreview from '@/components/listings/ListingPreview';
import { mockListings } from '@/lib/mock-data';

export default function ListingPage() {
  const params = useParams();
  const listingId = params.id as string;
  console.log("Listing ID: ", listingId);
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      try {
        setIsLoading(true);
        setError(null);
        
        // Find the listing from mock data
        const foundListing = mockListings.find(l => l.id === listingId);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!foundListing) {
          throw new Error('Listing not found');
        }
        
        setListing(foundListing);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch listing');
      } finally {
        setIsLoading(false);
      }
    };

    if (listingId) {
      fetchListing();
    }
  }, [listingId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-red-600">
              <h2 className="text-xl font-semibold mb-2">Error</h2>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-600">
              <h2 className="text-xl font-semibold mb-2">Listing Not Found</h2>
              <p>The requested listing could not be found.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ListingPreview listing={listing} />
      </div>
    </div>
  );
} 