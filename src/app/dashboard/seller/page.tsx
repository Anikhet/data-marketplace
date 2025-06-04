

import SellerDashboard from '@/components/dashboard/SellerDashboard';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function SellerDashboardPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login'); // 🔒 redirect unauthenticated users
  }
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