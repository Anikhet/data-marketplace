import { redirect } from 'next/navigation';
import BuyerDashboard from '@/components/dashboard/BuyerDashboard';
import { createClient } from '@/utils/supabase/server';

export default async function BuyerDashboardPage() {
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
          <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your list requests, enrichment add-ons, and downloads
          </p>
        </div>
        <BuyerDashboard />
      </div>
    </div>
  );
}
