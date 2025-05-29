import { useState, useCallback } from 'react';
import { Earnings, Rating, Fulfillment } from '@/lib/types';

export function useSellerDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [earnings, setEarnings] = useState<Earnings | null>(null);
  const [rating, setRating] = useState<Rating | null>(null);
  const [fulfillment, setFulfillment] = useState<Fulfillment | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API calls
      const [earningsRes, ratingRes, fulfillmentRes] = await Promise.all([
        fetch('/api/seller/earnings'),
        fetch('/api/seller/ratings'),
        fetch('/api/seller/fulfillment'),
      ]);

      if (!earningsRes.ok || !ratingRes.ok || !fulfillmentRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const [earningsData, ratingData, fulfillmentData] = await Promise.all([
        earningsRes.json(),
        ratingRes.json(),
        fulfillmentRes.json(),
      ]);

      setEarnings(earningsData);
      setRating(ratingData);
      setFulfillment(fulfillmentData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestPayout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/seller/payout', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to request payout');
      const data = await response.json();
      setEarnings(prev => prev ? {
        ...prev,
        pending: 0,
        lastPayout: {
          date: new Date().toISOString(),
          amount: prev.pending,
        },
      } : null);
      return data;
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
    earnings,
    rating,
    fulfillment,
    fetchDashboardData,
    requestPayout,
  };
} 