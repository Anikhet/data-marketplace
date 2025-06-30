'use client';

import { useState } from 'react';
import { BaseGrid, type GridItem } from './BaseGrid';

// Mock data with specific examples for scrapers
const mockScrapers: GridItem[] = [
  {
    id: '1',
    title: 'Crunchbase Company Scraper',
    description: 'Extract company information, funding details, and key metrics from Crunchbase',
    status: 'active',
    lastUpdated: '2024-03-20',
    tags: ['Company Data', 'Funding', 'Business Intelligence'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Crunchbase Company Data'
  },
  {
    id: '2',
    title: 'LinkedIn Profile Collector',
    description: 'Gather professional profiles, skills, and career information from LinkedIn',
    status: 'active',
    lastUpdated: '2024-03-19',
    tags: ['Professional', 'Career', 'Networking'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    imageAlt: 'LinkedIn Professional Profiles'
  },
  {
    id: '3',
    title: 'Google Maps Business Scraper',
    description: 'Extract business listings, reviews, and location data from Google Maps',
    status: 'pending',
    lastUpdated: '2024-03-18',
    tags: ['Business', 'Reviews', 'Location'],
    imageUrl: 'https://unsplash.com/photos/google-sign-fpZZEV0uQwA',
    imageAlt: 'Google Maps Business Data'
  },
  {
    id: '4',
    title: 'Clutch Company Reviews',
    description: 'Collect company reviews, ratings, and service information from Clutch',
    status: 'active',
    lastUpdated: '2024-03-17',
    tags: ['Reviews', 'B2B', 'Services'],
    imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Clutch Company Reviews'
  },
  {
    id: '5',
    title: 'Angie\'s List Service Providers',
    description: 'Gather service provider information and customer reviews from Angie\'s List',
    status: 'active',
    lastUpdated: '2024-03-16',
    tags: ['Services', 'Reviews', 'Home Services'],
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1964&auto=format&fit=crop',
    imageAlt: 'Angie\'s List Service Providers'
  },
  {
    id: '6',
    title: 'Yelp Business Directory',
    description: 'Extract business information, ratings, and customer reviews from Yelp',
    status: 'active',
    lastUpdated: '2024-03-15',
    tags: ['Business', 'Reviews', 'Local'],
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
    imageAlt: 'Yelp Business Directory'
  },
  {
    id: '7',
    title: 'Glassdoor Company Reviews',
    description: 'Collect company reviews, salaries, and interview experiences from Glassdoor',
    status: 'pending',
    lastUpdated: '2024-03-14',
    tags: ['Reviews', 'Salaries', 'Interviews'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Glassdoor Company Reviews'
  },
  {
    id: '8',
    title: 'Indeed Job Listings',
    description: 'Extract job listings, company information, and salary data from Indeed',
    status: 'active',
    lastUpdated: '2024-03-13',
    tags: ['Jobs', 'Career', 'Salaries'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Indeed Job Listings'
  },
];

export function ScrapersGrid() {
  const [isLoading] = useState(false);
  const [scrapers] = useState<GridItem[]>(mockScrapers);

  const handleCreateNew = () => {
    // Implement create new scraper functionality
    console.log('Create new scraper');
  };

  const handleScraperClick = (scraper: GridItem) => {
    // Implement scraper click functionality
    console.log('Scraper clicked:', scraper);
  };

  return (
    <BaseGrid
      title="Scrapers"
      items={scrapers}
      isLoading={isLoading}
      onCreateNew={handleCreateNew}
      onItemClick={handleScraperClick}
      emptyStateMessage="No scrapers found. Create your first scraper to get started."
    />
  );
} 