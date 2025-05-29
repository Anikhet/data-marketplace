import { useState, useEffect } from 'react';
import { Download, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import { useBuyerDashboard } from '@/hooks/useBuyerDashboard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState<'requests' | 'addons' | 'downloads'>('requests');
  const {
    isLoading,
    error,
    listRequests,
    enrichmentAddons,
    downloads,
    fetchDashboardData,
    toggleAddon,
    downloadList,
  } = useBuyerDashboard();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleToggleAddon = async (addonId: string) => {
    try {
      await toggleAddon(addonId);
      toast.success('Addon toggled successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to toggle addon';
      toast.error(message);
    }
  };

  const handleDownload = async (requestId: string) => {
    try {
      await downloadList(requestId);
      toast.success('List downloaded successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to download list';
      toast.error(message);
    }
  };

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
            onClick={() => setActiveTab('requests')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'requests'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            List Requests
          </button>
          <button
            onClick={() => setActiveTab('addons')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'addons'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Enrichment Addons
          </button>
          <button
            onClick={() => setActiveTab('downloads')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'downloads'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Downloads
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Your List Requests</h2>
              <Button className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                New Request
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
              listRequests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{request.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Seller: {request.seller}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${request.price}</p>
                      <p className="text-sm text-gray-500">
                        {request.date}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      {request.status === 'approved' && (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      )}
                      {request.status === 'pending' && (
                        <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                      )}
                      {request.status === 'rejected' && (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span
                        className={`text-sm ${
                          request.status === 'approved'
                            ? 'text-green-600'
                            : request.status === 'pending'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    {request.status === 'approved' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(request.id)}
                        disabled={isLoading}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'addons' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Enrichment Addons</h2>
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
              enrichmentAddons.map((addon) => (
                <div
                  key={addon.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{addon.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {addon.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${addon.price}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant={addon.selected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleToggleAddon(addon.id)}
                      disabled={isLoading}
                    >
                      {addon.selected ? 'Selected' : 'Select'}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Your Downloads</h2>
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
              downloads.map((download) => (
                <div
                  key={download.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{download.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {download.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {download.format.toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {download.size}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`/api/downloads/${download.id}`, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Again
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
} 