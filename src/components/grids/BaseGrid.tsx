'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface GridItem {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  lastUpdated: string;
  tags?: string[];
  imageUrl?: string;
  imageAlt?: string;
}

interface BaseGridProps {
  title: string;
  items: GridItem[];
  isLoading?: boolean;
  onCreateNew?: () => void;
  onItemClick?: (item: GridItem) => void;
  emptyStateMessage?: string;
}

export function BaseGrid({
  title,
  items,
  isLoading = false,
  onCreateNew,
  onItemClick,
  emptyStateMessage = 'No items found',
}: BaseGridProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const getStatusColor = (status: GridItem['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        {onCreateNew && (
          <Button
            onClick={onCreateNew}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4" />
            Create New
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">{emptyStateMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200",
                "hover:shadow-md hover:border-blue-200 cursor-pointer",
                onItemClick && "cursor-pointer"
              )}
              onClick={() => onItemClick?.(item)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'}
                  alt={item.imageAlt || item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      getStatusColor(item.status)
                    )}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-200">
                      Updated {new Date(item.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {item.description}
                </p>
                
                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Hover Overlay */}
              <div className={cn(
                "absolute inset-0 bg-blue-600/10 backdrop-blur-[2px] transition-opacity duration-200",
                hoveredItem === item.id ? "opacity-100" : "opacity-0"
              )} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 