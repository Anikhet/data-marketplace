import { useState, useEffect } from 'react';
import { Upload, Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useListings } from '@/hooks/useListings';
import { useSellerDashboard } from '@/hooks/useSellerDashboard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState<'listings' | 'earnings' | 'ratings' | 'fulfillment'>('listings');
  const { listings, isLoading: isListingsLoading, error: listingsError, fetchListings } = useListings();
  const {
    isLoading: isDashboardLoading,
    error: dashboardError,
    earnings,
    rating,
    fulfillment,
    fetchDashboardData,
    requestPayout,
  } = useSellerDashboard();

  useEffect(() => {
    fetchListings();
    fetchDashboardData();
  }, [fetchListings, fetchDashboardData]);

  const handlePayoutRequest = async () => {
    try {
      await requestPayout();
      toast.success('Payout requested successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to request payout';
      toast.error(message);
    }
  };

  const error = listingsError || dashboardError;
  const isLoading = isListingsLoading || isDashboardLoading;

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tabs */}
      <div className="border-b">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'listings'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Listings
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'earnings'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Earnings
          </button>
          <button
            onClick={() => setActiveTab('ratings')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'ratings'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Ratings
          </button>
          <button
            onClick={() => setActiveTab('fulfillment')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'fulfillment'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Fulfillment
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'listings' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Your Listings</h2>
              <Button className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload New Listing
              </Button>
            </div>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              listings.map((listing) => (
                <div
                  key={listing.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{listing.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Last updated: {listing.lastUpdated}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${listing.price}</p>
                      <p className="text-sm text-gray-500">
                        {listing.requests} requests
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      {listing.status === 'active' && (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      )}
                      {listing.status === 'pending' && (
                        <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                      )}
                      {listing.status === 'rejected' && (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span
                        className={`text-sm ${
                          listing.status === 'active'
                            ? 'text-green-600'
                            : listing.status === 'pending'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                      >
                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit Listing
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'earnings' && earnings && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800">Total Earnings</h3>
                <p className="text-2xl font-bold text-blue-900 mt-2">
                  ${earnings.total.toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800">Pending Earnings</h3>
                <p className="text-2xl font-bold text-yellow-900 mt-2">
                  ${earnings.pending.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-green-800">Last Payout</h3>
                <p className="text-2xl font-bold text-green-900 mt-2">
                  ${earnings.lastPayout.amount.toLocaleString()}
                </p>
                <p className="text-sm text-green-700 mt-1">
                  {earnings.lastPayout.date}
                </p>
              </div>
            </div>
            {earnings.pending > 0 && (
              <div className="flex justify-end">
                <Button onClick={handlePayoutRequest} disabled={isLoading}>
                  Request Payout
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ratings' && rating && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold">{rating.average}</div>
              <div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(rating.average)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Based on {rating.total} reviews
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {Object.entries(rating.breakdown)
                .reverse()
                .map(([stars, count]) => (
                  <div key={stars} className="flex items-center">
                    <span className="w-12 text-sm text-gray-600">
                      {stars} stars
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-4">
                      <div
                        className="h-2 bg-yellow-400 rounded-full"
                        style={{
                          width: `${(count / rating.total) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="w-12 text-sm text-gray-600 text-right">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'fulfillment' && fulfillment && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800">Pending</h3>
                <p className="text-2xl font-bold text-yellow-900 mt-2">
                  {fulfillment.pending}
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-green-800">Completed</h3>
                <p className="text-2xl font-bold text-green-900 mt-2">
                  {fulfillment.completed}
                </p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-red-800">Rejected</h3>
                <p className="text-2xl font-bold text-red-900 mt-2">
                  {fulfillment.rejected}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 