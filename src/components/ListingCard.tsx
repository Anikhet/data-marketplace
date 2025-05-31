import { Listing } from '@/lib/types';
import { Star, Shield } from 'lucide-react';
import Link from 'next/link';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link 
      href={`/listings/${listing.id}`}
      className="block"
    >
      <div className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{listing.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
          </div>
          {listing.isVerified && (
            <Shield className="h-5 w-5 text-green-500" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Industry</p>
            <p className="font-medium">{listing.industry}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Job Title</p>
            <p className="font-medium">{listing.jobTitle}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Volume</p>
            <p className="font-medium">{listing.volume}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-medium">{listing.type}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 font-medium">{listing.seller.rating}</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            ${listing.price.toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  );
} 