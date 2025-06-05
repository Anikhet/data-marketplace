import { Listing } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ListingCard } from './ListingCard';
import NoResultsFound from './NoResultsFound';

interface ListingsGridProps {
  listings: Listing[];
  isLoading: boolean;
  isFiltering: boolean;
  searchQuery: string;
  activeFilterCount: number;
  onRequestList: (id: string) => Promise<void>;
}

export function ListingsGrid({
  listings,
  isLoading,
  searchQuery,
  activeFilterCount,
  onRequestList,
}: ListingsGridProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Lists'}
          </CardTitle>
          {activeFilterCount > 0 && (
            <span className="text-sm text-muted-foreground">
              {activeFilterCount} active filters
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onRequestList={onRequestList}
                isLoading={isLoading}
              />
            ))}
          </div>
        ) : (
          <NoResultsFound />
        )}
      </CardContent>
    </Card>
  );
} 
