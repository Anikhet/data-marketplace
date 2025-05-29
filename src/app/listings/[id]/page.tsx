'use client';

import { useParams } from 'next/navigation';
import ListingPreview from '@/components/ListingPreview';

// This would typically come from an API
const sampleListing = {
  title: 'Tech Industry C-Level Executives 2024',
  description: 'A comprehensive list of C-level executives from leading technology companies, including CEOs, CTOs, and CFOs.',
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
    lastSoldCount: 156,
    qualityScore: 95,
  },
};

export default function ListingPage() {
  const params = useParams();
  // const listingId = params.id;

  // In a real application, you would fetch the listing data based on the ID
  // const { data: listing } = useQuery(['listing', listingId], () => fetchListing(listingId));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ListingPreview listing={sampleListing} />
      </div>
    </div>
  );
} 