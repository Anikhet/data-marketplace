'use client';

import { useListings } from '@/hooks/useListings';
import { HeroSection } from './home/HeroSection';
import SearchSection from './home/SearchSection';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
// import { useListings } from './../useListings';

export default function Home() {
  const { error } = useListings();

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}
        <SearchSection />
      </div>
    </div>
  );
}
