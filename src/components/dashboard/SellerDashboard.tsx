'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/contexts/dashboard-context';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

export default function SellerDashboard() {
  const { sellerStats, recentListings } = useDashboard();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(sellerStats.revenue)}</div>
          </CardContent>
        </Card>

             <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellerStats.completedRequests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellerStats.totalListings}</div>
          </CardContent>
        </Card>
        
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellerStats.activeRequests}</div>
          </CardContent>
        </Card> */}
        
   
        
 
      </div>

      {/* Recent Listings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentListings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <h3 className="font-medium">{listing.listingTitle}</h3>
                  <p className="text-sm text-gray-500">
                    Listed on {new Date(listing.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(listing.status)}>
                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                  </Badge>
                  <span className="font-medium">{formatCurrency(listing.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 