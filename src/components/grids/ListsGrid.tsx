'use client';

import { useState } from 'react';
import { BaseGrid, type GridItem } from './BaseGrid';

// Mock data - replace with actual data fetching
const mockLists: GridItem[] = [
  {
    id: '1',
    title: 'Tech Startups 2024',
    description: 'List of technology startups founded in 2024',
    status: 'active',
    lastUpdated: '2024-03-20',
  },
  {
    id: '2',
    title: 'AI Companies',
    description: 'Companies working on artificial intelligence',
    status: 'active',
    lastUpdated: '2024-03-19',
  },
  {
    id: '3',
    title: 'Healthcare Innovators',
    description: 'Healthcare companies with innovative solutions',
    status: 'pending',
    lastUpdated: '2024-03-18',
  },
];

export function ListsGrid() {
  const [isLoading] = useState(false);
  const [lists] = useState<GridItem[]>(mockLists);

  const handleCreateNew = () => {
    // Implement create new list functionality
    console.log('Create new list');
  };

  const handleListClick = (list: GridItem) => {
    // Implement list click functionality
    console.log('List clicked:', list);
  };

  return (
    <BaseGrid
      title="Data Lists"
      items={lists}
      isLoading={isLoading}
      onCreateNew={handleCreateNew}
      onItemClick={handleListClick}
      emptyStateMessage="No lists found. Create your first list to get started."
    />
  );
} 