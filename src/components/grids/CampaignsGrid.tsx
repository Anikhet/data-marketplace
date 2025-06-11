'use client';

import { useState } from 'react';
import { BaseGrid, type GridItem } from './BaseGrid';

// Mock data with specific examples for campaigns
const mockCampaigns: GridItem[] = [
  {
    id: '1',
    title: 'Q2 Tech Outreach',
    description: 'Outreach campaign for technology companies in the B2B SaaS space',
    status: 'active',
    lastUpdated: '2024-03-20',
    tags: ['B2B', 'SaaS', 'Tech'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Tech Outreach Campaign'
  },
  {
    id: '2',
    title: 'Healthcare Partners',
    description: 'Targeted campaign for healthcare organizations and medical professionals',
    status: 'inactive',
    lastUpdated: '2024-03-15',
    tags: ['Healthcare', 'Medical', 'B2B'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Healthcare Partners Campaign'
  },
  {
    id: '3',
    title: 'AI Research Labs',
    description: 'Campaign targeting AI research laboratories and technology innovators',
    status: 'pending',
    lastUpdated: '2024-03-18',
    tags: ['AI', 'Research', 'Innovation'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop',
    imageAlt: 'AI Research Labs Campaign'
  },
  {
    id: '4',
    title: 'Startup Accelerator',
    description: 'Outreach to early-stage startups and accelerator programs',
    status: 'active',
    lastUpdated: '2024-03-17',
    tags: ['Startups', 'Accelerator', 'Innovation'],
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Startup Accelerator Campaign'
  },
  {
    id: '5',
    title: 'Enterprise Solutions',
    description: 'Targeted campaign for enterprise-level companies and decision makers',
    status: 'active',
    lastUpdated: '2024-03-16',
    tags: ['Enterprise', 'B2B', 'Solutions'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Enterprise Solutions Campaign'
  },
  {
    id: '6',
    title: 'FinTech Innovators',
    description: 'Campaign focusing on financial technology companies and innovators',
    status: 'active',
    lastUpdated: '2024-03-15',
    tags: ['FinTech', 'Finance', 'Innovation'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    imageAlt: 'FinTech Innovators Campaign'
  },
  {
    id: '7',
    title: 'GreenTech Initiative',
    description: 'Outreach to sustainable technology and green energy companies',
    status: 'pending',
    lastUpdated: '2024-03-14',
    tags: ['GreenTech', 'Sustainability', 'Energy'],
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'GreenTech Initiative Campaign'
  },
  {
    id: '8',
    title: 'EdTech Partners',
    description: 'Campaign targeting educational technology companies and institutions',
    status: 'active',
    lastUpdated: '2024-03-13',
    tags: ['EdTech', 'Education', 'Innovation'],
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop',
    imageAlt: 'EdTech Partners Campaign'
  },
];

export function CampaignsGrid() {
  const [isLoading] = useState(false);
  const [campaigns] = useState<GridItem[]>(mockCampaigns);

  const handleCreateNew = () => {
    // Implement create new campaign functionality
    console.log('Create new campaign');
  };

  const handleCampaignClick = (campaign: GridItem) => {
    // Implement campaign click functionality
    console.log('Campaign clicked:', campaign);
  };

  return (
    <BaseGrid
      title="Campaigns"
      items={campaigns}
      isLoading={isLoading}
      onCreateNew={handleCreateNew}
      onItemClick={handleCampaignClick}
      emptyStateMessage="No campaigns found. Create your first campaign to get started."
    />
  );
} 