import { useState, useCallback } from 'react';
import { ListRequest, EnrichmentAddon, Download } from '@/lib/types';

export function useBuyerDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listRequests, setListRequests] = useState<ListRequest[]>([]);
  const [enrichmentAddons, setEnrichmentAddons] = useState<EnrichmentAddon[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API calls
      const [requestsRes, addonsRes, downloadsRes] = await Promise.all([
        fetch('/api/buyer/requests'),
        fetch('/api/buyer/addons'),
        fetch('/api/buyer/downloads'),
      ]);

      if (!requestsRes.ok || !addonsRes.ok || !downloadsRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const [requestsData, addonsData, downloadsData] = await Promise.all([
        requestsRes.json(),
        addonsRes.json(),
        downloadsRes.json(),
      ]);

      setListRequests(requestsData);
      setEnrichmentAddons(addonsData);
      setDownloads(downloadsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleAddon = useCallback(async (addonId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/buyer/addons/${addonId}/toggle`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to toggle addon');
      const updatedAddon = await response.json();
      setEnrichmentAddons(prev =>
        prev.map(addon => (addon.id === addonId ? updatedAddon : addon))
      );
      return updatedAddon;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const downloadList = useCallback(async (requestId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/buyer/requests/${requestId}/download`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to download list');
      const download = await response.json();
      setDownloads(prev => [...prev, download]);
      return download;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    listRequests,
    enrichmentAddons,
    downloads,
    fetchDashboardData,
    toggleAddon,
    downloadList,
  };
} 