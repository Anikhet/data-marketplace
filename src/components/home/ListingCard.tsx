import { Listing } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

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
  return (
    <Card className="h-[400px] relative">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-light">{listing.title}</h3>
          <Badge variant={listing.isVerified ? "default" : "secondary"}>
            {listing.isVerified ? "Verified" : "Unverified"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {listing.description}
        </p>
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground mr-2">Industry:</span>
            <span>{listing.industry}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground mr-2">Job Title:</span>
            <span>{listing.jobTitle}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground mr-2">Volume:</span>
            <span>{listing.volume}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground mr-2">Type:</span>
            <span>{listing.type}</span>
          </div>
        </div>
        <div className="flex items-center mt-auto mb-12">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 text-sm">
            {listing.seller.rating} ({listing.seller.name})
          </span>
        </div>
        <Button 
          className="absolute  bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-6rem)]" 
          onClick={() => onRequestList(listing.id)} 
          disabled={isLoading}
        >
          ${listing.price}
        </Button>
      </CardContent>
    </Card>
  );
}
