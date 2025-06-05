'use client';

// import { HeroSection } from '@/components/home/HeroSection';
import SearchSection from '@/components/home/SearchSection';
import UpsellSection from '@/components/home/UpsellSection';

import { ListingsProvider } from '@/contexts/listings-context';

export default function Home() {
  return (
    <ListingsProvider>
      <main className="min-h-screen">
         
        {/* <HeroSection /> */}
        <SearchSection />
        <UpsellSection />
      </main>
    </ListingsProvider>
  );
} 