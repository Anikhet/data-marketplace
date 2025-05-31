import { useState } from 'react';
import { Star, Shield, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { ListingPreviewProps } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export function ListingPreview({ listing }: ListingPreviewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/listings/${listing.id}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to request list: ${response.statusText}`);
      }
      
      toast.success('List requested successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to request list';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
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
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
        <p className="text-gray-600">{listing.description}</p>
      </div>

      {/* Metadata Tags */}
      <div className="p-6 border-b">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Niche</p>
              <p className="font-medium">{listing.metadata.niche}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Source</p>
              <p className="font-medium">{listing.metadata.source}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Freshness</p>
              <p className="font-medium">{listing.metadata.freshness}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Exclusivity</p>
              <p className="font-medium">{listing.metadata.exclusivityLevel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 border-b bg-gray-50">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Rating</p>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 font-medium">{listing.stats.rating}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Sold</p>
            <p className="font-medium">{listing.stats.lastSoldCount} times</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Quality Score</p>
            <p className="font-medium">{listing.stats.qualityScore}/100</p>
          </div>
        </div>
      </div>

      {/* Preview Records */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Preview Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {listing.previewRecords.map((record, index) => (
                <tr key={`${record.email}-${index}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.email.replace(/(?<=.{3}).(?=.*@)/g, '*')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 border-t bg-gray-50">
        <Button
          onClick={handleRequestList}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <span>Processing...</span>
            </div>
          ) : (
            'Request This List'
          )}
        </Button>
      </div>
    </div>
  );
} 