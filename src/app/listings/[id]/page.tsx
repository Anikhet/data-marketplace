'use client';



import { useEffect, useState } from 'react';
import { Listing } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';
import ListingPreview from '@/components/ListingPreview';








export default function ListingPage() {
  const params = useParams();
  const listingId = params.id as string;
  console.log("Listing ID: ", listingId);
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // TODO: Replace with actual API call
        // For now, using mock data
        const mockListing: Listing = {
          id: listingId,
          title: 'Tech Industry C-Level Executives 2024',
          description: 'A comprehensive list of C-level executives from leading technology companies, including CEOs, CTOs, and CFOs.',
          industry: 'Technology',
          jobTitle: 'C-Level',
          volume: '1000',
          type: 'Email',
          price: 999,
          isVerified: true,
          seller: {
            id: '1',
            name: 'DataPro Solutions',
            rating: 4.8,
          },
          metadata: {
            niche: 'Technology',
            source: 'Verified Company Websites',
            freshness: 'Updated Weekly',
            exclusivityLevel: 'Premium',
          },
          previewRecords: [
            {
              name: 'John Smith',
              title: 'CEO',
              company: 'TechCorp Inc.',
              email: 'john.smith@techcorp.com',
            },
            {
              name: 'Sarah Johnson',
              title: 'CTO',
              company: 'InnovateTech',
              email: 'sarah.j@innovatetech.com',
            },
            {
              name: 'Michael Chen',
              title: 'CFO',
              company: 'Future Systems',
              email: 'mchen@futuresystems.com',
            },
            {
              name: 'Emily Davis',
              title: 'CEO',
              company: 'DataFlow Solutions',
              email: 'emily.d@dataflow.com',
            },
            {
              name: 'Robert Wilson',
              title: 'CTO',
              company: 'CloudTech',
              email: 'rwilson@cloudtech.com',
            },
          ],
          stats: {
            rating: 4.8,
            lastSoldCount: 45,
            qualityScore: 92,
            totalCount: 1000,
            remainingCount: 250,
            lastUpdated: '2024-03-15'
          }
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setListing(mockListing);
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