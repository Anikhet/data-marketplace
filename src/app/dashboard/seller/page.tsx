

import SellerDashboard from '@/components/SellerDashboard';

export default function SellerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your listings, view earnings, ratings, and fulfillment status
          </p>
        </div>
        <SellerDashboard />
      </div>
    </div>
  );
} 