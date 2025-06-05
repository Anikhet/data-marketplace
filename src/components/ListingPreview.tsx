'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  CellContext,
} from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { Star, Shield, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { ListingPreviewProps } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useState } from 'react';

interface PreviewRecord {
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
}

const mockPreviewRecords: PreviewRecord[] = [
  {
    name: 'John Smith',
    title: 'CEO',
    company: 'TechCorp Inc.',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567'
  },
  {
    name: 'Sarah Johnson',
    title: 'CTO',
    company: 'InnovateTech',
    email: 'sarah.j@innovatetech.com',
    phone: '+1 (555) 234-5678'
  },
  {
    name: 'Michael Chen',
    title: 'CFO',
    company: 'Future Systems',
    email: 'mchen@futuresystems.com',
    phone: '+1 (555) 345-6789'
  },
  {
    name: 'Emily Davis',
    title: 'CEO',
    company: 'DataFlow Solutions',
    email: 'emily.d@dataflow.com',
    phone: '+1 (555) 456-7890'
  },
  {
    name: 'Robert Wilson',
    title: 'CTO',
    company: 'CloudTech',
    email: 'rwilson@cloudtech.com',
    phone: '+1 (555) 567-8901'
  }
];

export function ListingPreview({ listing }: ListingPreviewProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'title', 'company', 'email']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addColumn = (column: string) => {
    if (!selectedColumns.includes(column)) {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const baseColumns: ColumnDef<PreviewRecord>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Company',
      accessorKey: 'company',
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: (info) => info.getValue<string>().replace(/(?<=.{3}).(?=.*@)/g, '*'),
    },
  ];

  const columns = selectedColumns.includes('phone') 
    ? [...baseColumns, {
        header: 'Phone',
        accessorKey: 'phone',
        cell: (info: CellContext<PreviewRecord, string | null>) => info.getValue() ?? 'N/A',
      }]
    : baseColumns;

  const table = useReactTable({
    data: mockPreviewRecords,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRequestList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('List requested successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to request list';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">{listing.title}</h1>
        <p className="text-gray-600">{listing.description}</p>
      </div>

      {/* Metadata Tags */}
      <div className="p-6 border-b border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm text-gray-500">Niche</p>
              <p className="font-medium text-gray-900">{listing.metadata.niche}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-emerald-500" />
            <div>
              <p className="text-sm text-gray-500">Source</p>
              <p className="font-medium text-gray-900">{listing.metadata.source}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-sky-500" />
            <div>
              <p className="text-sm text-gray-500">Freshness</p>
              <p className="font-medium text-gray-900">{listing.metadata.freshness}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm text-gray-500">Exclusivity</p>
              <p className="font-medium text-gray-900">{listing.metadata.exclusivityLevel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 border-b border-gray-100 bg-gray-50">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Rating</p>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-amber-400" />
              <span className="ml-1 font-medium text-gray-900">{listing.stats.rating}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Sold</p>
            <p className="font-medium text-gray-900">{listing.stats.lastSoldCount} times</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Quality Score</p>
            <p className="font-medium text-gray-900">{listing.stats.qualityScore}/100</p>
          </div>
        </div>
      </div>

      {/* Preview Records */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Preview Records</h2>
          <button
            onClick={() => addColumn('phone')}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Column
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 border-t border-gray-100 bg-gray-50">
        <Button
          onClick={handleRequestList}
          disabled={isLoading}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-300"
          variant="outline"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <span>Processing...</span>
            </div>
          ) : (
            'Request This List'
          )}
        </Button>
      </div>
    </div>
  );
} 