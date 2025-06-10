import { Listing } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "../ui/badge";
import { Star, Clock, TrendingUp, Lock, Sparkles, Target, Users, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import { useState } from "react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

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
  
  // Use specific image IDs for consistent results - business and tech related images
  const imageIds = [
    'photo-1551288049-bebda4e38f71', // Modern office space
    'photo-1552664730-d307ca884978', // Business meeting
    'photo-1460925895917-afdab827c52f', // Data analytics
    'photo-1551434678-e076c223a692', // Team collaboration
    'photo-1553877522-43269d4ea984', // Tech workspace
    'photo-1557804506-669a67965ba0', // Business growth chart
    'photo-1552664730-d307ca884978', // Professional networking
    'photo-1553877522-43269d4ea984', // Modern tech office
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

export function ListingCard({
  listing,
  onRequestList,
  isLoading,
}: ListingCardProps) {
  const { isAuthenticated, showAuthModal } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [buttonText, setButtonText] = useState("Request List");

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

    // List-specific badges
    if (listing.title.includes('LinkedIn')) {
      badges.push(
        <Badge key="active" variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
          <Users className="h-3 w-3 mr-1" />
          Active Followers
        </Badge>
      );
    }

    if (listing.title.includes('Clay')) {
      badges.push(
        <Badge key="community" variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
          <Sparkles className="h-3 w-3 mr-1" />
          Community Verified
        </Badge>
      );
    }

    if (listing.title.includes('DC Tech Week')) {
      badges.push(
        <Badge key="event" variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
          <Target className="h-3 w-3 mr-1" />
          Event Attendees
        </Badge>
      );
    }

    if (listing.title.includes('Smartlead')) {
      badges.push(
        <Badge key="customer" variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-200">
          <TrendingUp className="h-3 w-3 mr-1" />
          Active Customers
        </Badge>
      );
    }

    if (listing.title.includes('Slashdot')) {
      badges.push(
        <Badge key="featured" variant="secondary" className="bg-rose-50 text-rose-700 border-rose-200">
          <Star className="h-3 w-3 mr-1" />
          Featured Companies
        </Badge>
      );
    }

    if (listing.title.includes('Stripe')) {
      badges.push(
        <Badge key="revenue" variant="secondary" className="bg-teal-50 text-teal-700 border-teal-200">
          <TrendingUp className="h-3 w-3 mr-1" />
          $1M+ Revenue
        </Badge>
      );
    }

    // Add freshness badge
    badges.push(
      <Badge key="freshness" variant="secondary" className="bg-sky-50 text-sky-700 border-sky-200">
        <Clock className="h-3 w-3 mr-1" />
        {listing.metadata.freshness}
      </Badge>
    );

    // Add exclusivity badge
    badges.push(
      <Badge key="exclusive" variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
        <Lock className="h-3 w-3 mr-1" />
        {listing.metadata.exclusivityLevel}
      </Badge>
    );

    return badges;
  };

  return (
<Card className=" flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-200">
  {/* Entire clickable area except the footer */}
  <div className="flex-1">
    <Link href={`/listings/${listing.id}`} className="block h-full cursor-pointer">
      <CardContent className="p-6 h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            {!imageError ? (
              <Image
                src={getProfileImageUrl(listing.seller.name)}
                alt={`${listing.seller.name}'s profile`}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                sizes="48px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-bold">
                {listing.seller.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors truncate">
              {listing.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              by {listing.seller.name} ★ {listing.seller.rating}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2.5">
          {getUniqueBadges(listing)}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {listing.description}
        </p>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm mt-auto">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Industry</span>
            <span className="font-medium text-gray-900 truncate mt-1">{listing.industry}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Volume</span>
            <span className="font-medium text-gray-900 truncate mt-1">{listing.volume}</span>
          </div>
        </div>
      </CardContent>
    </Link>
  </div>

  {/* CTA Footer - not inside Link */}
  <div className="p-5 border-t border-gray-100 bg-white flex items-center justify-center">
    <InteractiveHoverButton
      // className="bg-orange-500 hover:bg-orange-600 text-white transition-colors px-4 py-2 text-sm"
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
      onMouseEnter={() =>
  setButtonText(
    listing.price ? `$${listing.price}` : "Request List"
  )
}

      onMouseLeave={() => setButtonText("Request List")}
    >
      {buttonText}
    </ InteractiveHoverButton>
  </div>
</Card>


  );
}
