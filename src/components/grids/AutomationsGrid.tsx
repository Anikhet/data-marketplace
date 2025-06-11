'use client';

import { useState } from 'react';
import { BaseGrid, type GridItem } from './BaseGrid';

// Mock data with specific examples for automations
const mockAutomations: GridItem[] = [
  {
    id: '1',
    title: 'Website Visitor Tracking',
    description: 'Monitor and analyze website visitors, their behavior, and engagement patterns',
    status: 'active',
    lastUpdated: '2024-03-20',
    tags: ['Analytics', 'Tracking', 'Behavior'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    imageAlt: 'Website Analytics Dashboard'
  },
  {
    id: '2',
    title: 'Career Change Monitor',
    description: 'Track professional career changes and job transitions across companies',
    status: 'active',
    lastUpdated: '2024-03-19',
    tags: ['Career', 'Monitoring', 'Transitions'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Career Change Monitoring'
  },
  {
    id: '3',
    title: 'Company Growth Tracker',
    description: 'Monitor company growth metrics, funding rounds, and expansion activities',
    status: 'pending',
    lastUpdated: '2024-03-18',
    tags: ['Growth', 'Metrics', 'Business'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Company Growth Analytics'
  },
  {
    id: '4',
    title: 'Social Media Engagement',
    description: 'Track social media mentions, sentiment, and engagement across platforms',
    status: 'active',
    lastUpdated: '2024-03-17',
    tags: ['Social', 'Engagement', 'Analytics'],
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop',
    imageAlt: 'Social Media Analytics'
  },
  {
    id: '5',
    title: 'News & Press Monitoring',
    description: 'Monitor news coverage, press releases, and media mentions in real-time',
    status: 'active',
    lastUpdated: '2024-03-16',
    tags: ['News', 'Press', 'Media'],
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'News Monitoring Dashboard'
  },
  {
    id: '6',
    title: 'Competitor Analysis',
    description: 'Track competitor activities, product launches, and market positioning',
    status: 'active',
    lastUpdated: '2024-03-15',
    tags: ['Competition', 'Analysis', 'Strategy'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Competitor Analysis Dashboard'
  },
  {
    id: '7',
    title: 'Market Trend Analysis',
    description: 'Analyze market trends, consumer behavior, and industry developments',
    status: 'pending',
    lastUpdated: '2024-03-14',
    tags: ['Market', 'Trends', 'Analysis'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    imageAlt: 'Market Trend Analysis'
  },
  {
    id: '8',
    title: 'Lead Scoring Pipeline',
    description: 'Automatically score and prioritize leads based on engagement and behavior',
    status: 'active',
    lastUpdated: '2024-03-13',
    tags: ['Leads', 'Scoring', 'Pipeline'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Lead Scoring Dashboard'
  },
];

export function AutomationsGrid() {
  const [isLoading] = useState(false);
  const [automations] = useState<GridItem[]>(mockAutomations);

  const handleCreateNew = () => {
    // Implement create new automation functionality
    console.log('Create new automation');
  };

  const handleAutomationClick = (automation: GridItem) => {
    // Implement automation click functionality
    console.log('Automation clicked:', automation);
  };

  return (
    <BaseGrid
      title="Automations"
      items={automations}
      isLoading={isLoading}
      onCreateNew={handleCreateNew}
      onItemClick={handleAutomationClick}
      emptyStateMessage="No automations found. Create your first automation to get started."
    />
  );
} 