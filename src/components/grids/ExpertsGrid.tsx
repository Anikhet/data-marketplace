'use client';

import { useState } from 'react';
import { BaseGrid, type GridItem } from './BaseGrid';

// Mock data with specific examples for experts
const mockExperts: GridItem[] = [
  {
    id: '1',
    title: 'Sarah Chen',
    description: 'Senior Copywriter specializing in B2B SaaS and technology marketing',
    status: 'active',
    lastUpdated: '2024-03-20',
    tags: ['Copywriting', 'B2B', 'SaaS'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    imageAlt: 'Sarah Chen - Senior Copywriter'
  },
  {
    id: '2',
    title: 'Michael Rodriguez',
    description: 'Campaign Strategist with 8+ years experience in digital marketing and lead generation',
    status: 'active',
    lastUpdated: '2024-03-19',
    tags: ['Strategy', 'Marketing', 'Campaigns'],
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Michael Rodriguez - Campaign Strategist'
  },
  {
    id: '3',
    title: 'Emma Thompson',
    description: 'Virtual Assistant specializing in data entry, research, and administrative tasks',
    status: 'active',
    lastUpdated: '2024-03-18',
    tags: ['VA', 'Research', 'Admin'],
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    imageAlt: 'Emma Thompson - Virtual Assistant'
  },
  {
    id: '4',
    title: 'David Kim',
    description: 'Content Strategist focused on SEO optimization and content marketing',
    status: 'active',
    lastUpdated: '2024-03-17',
    tags: ['Content', 'SEO', 'Strategy'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    imageAlt: 'David Kim - Content Strategist'
  },
  {
    id: '5',
    title: 'Lisa Patel',
    description: 'Social Media Manager with expertise in community building and engagement',
    status: 'active',
    lastUpdated: '2024-03-16',
    tags: ['Social Media', 'Community', 'Engagement'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    imageAlt: 'Lisa Patel - Social Media Manager'
  },
  {
    id: '6',
    title: 'James Wilson',
    description: 'Email Marketing Specialist with proven track record in campaign optimization',
    status: 'active',
    lastUpdated: '2024-03-15',
    tags: ['Email', 'Marketing', 'Automation'],
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
    imageAlt: 'James Wilson - Email Marketing Specialist'
  },
  {
    id: '7',
    title: 'Maria Garcia',
    description: 'Data Analyst specializing in market research and competitive analysis',
    status: 'active',
    lastUpdated: '2024-03-14',
    tags: ['Data', 'Analysis', 'Research'],
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop',
    imageAlt: 'Maria Garcia - Data Analyst'
  },
  {
    id: '8',
    title: 'Alex Wong',
    description: 'Technical Writer with expertise in API documentation and technical content',
    status: 'active',
    lastUpdated: '2024-03-13',
    tags: ['Technical', 'Documentation', 'API'],
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
    imageAlt: 'Alex Wong - Technical Writer'
  },
];

export function ExpertsGrid() {
  const [isLoading] = useState(false);
  const [experts] = useState<GridItem[]>(mockExperts);

  const handleCreateNew = () => {
    // Implement create new expert profile functionality
    console.log('Create new expert profile');
  };

  const handleExpertClick = (expert: GridItem) => {
    // Implement expert click functionality
    console.log('Expert clicked:', expert);
  };

  return (
    <BaseGrid
      title="Experts"
      items={experts}
      isLoading={isLoading}
      onCreateNew={handleCreateNew}
      onItemClick={handleExpertClick}
      emptyStateMessage="No experts found. Create your first expert profile to get started."
    />
  );
} 