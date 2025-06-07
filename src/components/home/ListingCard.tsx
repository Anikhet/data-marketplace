import { Listing } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { Clock, TrendingUp, Lock, Users, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import { useState } from "react";

interface ListingCardProps {
  listing: Listing;
  onRequestList: (id: string) => Promise<void>;
  isLoading: boolean;
}

// Function to get a consistent Unsplash image based on seller name
const getProfileImageUrl = (sellerName: string) => {
  const hash = sellerName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const imageIds = [
    'photo-1551288049-bebda4e38f71', // Modern office space
    'photo-1552664730-d307ca884978', // Business meeting
    'photo-1460925895917-afdab827c52f', // Data analytics
    'photo-1551434678-e076c223a692', // Team collaboration
    'photo-1553877522-43269d4ea984', // Tech workspace
    'photo-1557804506-669a67965ba0', // Business growth chart
  ];
  
  const imageId = imageIds[Math.abs(hash) % imageIds.length];
  return `https://images.unsplash.com/${imageId}?w=200&h=200&fit=crop&q=80`;
};

// Function to get rarity color based on remaining count
const getRarityColor = (remainingCount: number, totalCount: number) => {
  const percentage = (remainingCount / totalCount) * 100;
  if (percentage <= 10) return 'bg-red-50 text-red-700 border-red-200';
  if (percentage <= 25) return 'bg-orange-50 text-orange-700 border-orange-200';
  if (percentage <= 50) return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-emerald-50 text-emerald-700 border-emerald-200';
};

// Function to format price
const formatPrice = (price: number) => {
  return `$${(price / 100).toFixed(2)}`;
};

export function ListingCard({
  listing,
  onRequestList,
  isLoading,
}: ListingCardProps) {
  const { isAuthenticated, showAuthModal } = useAuth();
  const [imageError, setImageError] = useState(false);

  // Function to get unique badges based on listing type
  const getUniqueBadges = (listing: Listing) => {
    const badges = [];

    // Quality Score Badge
    badges.push(
      <Badge 
        key="quality" 
        variant="secondary" 
        className={listing.stats.qualityScore >= 90 
          ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
          : "bg-amber-50 text-amber-700 border-amber-200"
        }
      >
        {listing.stats.qualityScore >= 90 ? (
          <CheckCircle2 className="h-3 w-3 mr-1" />
        ) : (
          <AlertCircle className="h-3 w-3 mr-1" />
        )}
        {listing.stats.qualityScore}% Quality
      </Badge>
    );

    // Availability Badge
    badges.push(
      <Badge 
        key="availability" 
        variant="secondary" 
        className={getRarityColor(listing.stats.remainingCount, listing.stats.totalCount)}
      >
        <Lock className="h-3 w-3 mr-1" />
        {listing.stats.remainingCount} Left
      </Badge>
    );

    // Add freshness badge
    badges.push(
      <Badge key="freshness" variant="secondary" className="bg-sky-50 text-sky-700 border-sky-200">
        <Clock className="h-3 w-3 mr-1" />
        {listing.metadata.freshness}
      </Badge>
    );

    return badges;
  };

  return (
    <Card className="group h-[500px] flex flex-col hover:shadow-md transition-shadow duration-200">
      <Link href={`/listings/${listing.id}`} className="flex-1 block">
        <CardContent className="p-5 h-full flex flex-col">
          {/* Header Section with Image */}
          <div className="relative w-full h-32 rounded-lg overflow-hidden mb-4">
            {!imageError ? (
              <Image
                src={getProfileImageUrl(listing.seller.name)}
                alt={`${listing.title} preview`}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                <TrendingUp className="h-8 w-8" />
              </div>
            )}
          </div>

          {/* Title and Badges */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors truncate mb-2">
              {listing.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {getUniqueBadges(listing)}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">List Size</span>
              </div>
              <span className="font-semibold text-gray-900">{listing.stats.totalCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">Available</span>
              </div>
              <span className="font-semibold text-gray-900">{listing.stats.remainingCount.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Link>

      {/* Footer Section with Price */}
      <div className="p-5 border-t border-gray-100 bg-white">
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isAuthenticated) {
              showAuthModal();
              return;
            }
            onRequestList(listing.id);
          }}
          disabled={isLoading}
        >
          {formatPrice(listing.price)}
        </Button>
      </div>
    </Card>
  );
}
