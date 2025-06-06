import { Listing } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EnrichmentsPopup from "../listings/EnrichmentsPopup";
import { useAuth } from "@/contexts/auth-context";

interface ListingCardProps {
  listing: Listing;
  onRequestList: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function ListingCard({
  listing,
  onRequestList,
  isLoading,
}: ListingCardProps) {
  const [showEnrichments, setShowEnrichments] = useState(false);
  const { isAuthenticated, showAuthModal } = useAuth();

  const handleEnrichmentsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      showAuthModal();
      return;
    }
    setShowEnrichments(true);
  };

  const handleApplyEnrichments = (selectedEnrichments: string[]) => {
    // TODO: Implement enrichment application logic
    console.log('Applying enrichments:', selectedEnrichments);
    setShowEnrichments(false);
  };

  return (
    <>
      <Card className="h-[400px] relative">
        <Link href={`/listings/${listing.id}`} className="block h-[calc(100%-100px)]">
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{listing.title}</h3>
              <Badge variant={listing.isVerified ? "default" : "secondary"}>
                {listing.isVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {listing.description}
            </p>
            <div className="flex flex-col space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Industry:</span>
                <span>{listing.industry}</span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Job Title:</span>
                <span>{listing.jobTitle}</span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Volume:</span>
                <span>{listing.volume}</span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Type:</span>
                <span>{listing.type}</span>
              </div>
            </div>
          </CardContent>
        </Link>
        <div className="absolute bottom-[76px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] flex items-center">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 text-sm text-gray-700">
            {listing.seller.rating} ({listing.seller.name})
          </span>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] flex flex-col space-y-2">
          <Button 
            variant="outline"
            className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
            onClick={handleEnrichmentsClick}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Enrichments
          </Button>
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
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
            ${listing.price}
          </Button>
        </div>
      </Card>

      <EnrichmentsPopup
        isOpen={showEnrichments}
        onClose={() => setShowEnrichments(false)}
        onApply={handleApplyEnrichments}
        totalLeads={parseInt(listing.volume)}
      />
    </>
  );
}
