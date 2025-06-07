import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  CellContext,
} from '@tanstack/react-table';
import { Plus, Shield, Clock, TrendingUp, AlertCircle, Star, CheckCircle2, Users, Lock } from 'lucide-react';
import { ListingPreviewProps, Listing } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import EnrichmentsPopup from './EnrichmentsPopup';
import { useAuth } from '@/contexts/auth-context';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ListingCard } from '../home/ListingCard';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const badgeVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

// Mock data for FAQ
const faqItems = [
  {
    question: "What data is included in this list?",
    answer: "This list includes verified professional contacts with Name, Title, Company, and Email. Phone numbers are available as an enrichment.",
  },
  {
    question: "How fresh is the data?",
    answer: "The data freshness is indicated in the listing details (e.g., Updated Weekly, Updated Daily). We strive to provide the most up-to-date information possible.",
  },
  {
    question: "How is the data verified?",
    answer: "Our data is verified through a multi-step process including automated checks and manual review by our team. The verification rate is displayed in the stats section.",
  },
  {
    question: "What is the exclusivity level?",
    answer: "Exclusivity levels indicate how widely the list is available. Premium lists are offered to a limited number of buyers to maintain their value.",
  },
];

export default function ListingPreview({ listing }: ListingPreviewProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(['name', 'title', 'company', 'email']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEnrichments, setShowEnrichments] = useState(false);
  const { isAuthenticated, showAuthModal } = useAuth();

  const suggestedLists: Listing[] = [
    {
      id: 'suggested-1',
      title: 'Related Industry Contacts',
      description: 'Find more leads in similar industries.',
      price: 0, // Placeholder price
      isVerified: true,
      seller: { id: 'seller-auto-1', name: 'System Recommends', rating: 5.0 },
      metadata: { niche: listing.metadata.niche, source: 'System', freshness: 'Varies', exclusivityLevel: 'Standard' },
      stats: { rating: 5.0, lastSoldCount: 0, qualityScore: 90, totalCount: 0, remainingCount: 0, lastUpdated: 'N/A' },
      volume: 'Varies',
      type: 'Mixed',
      industry: listing.industry,
      jobTitle: 'Mixed',
      previewRecords: [],
    },
    {
      id: 'suggested-2',
      title: `More from ${listing.seller.name}`,
      description: 'Explore other lists from this highly-rated seller.',
      price: 0,
      isVerified: true,
      seller: { id: listing.seller.id, name: listing.seller.name, rating: listing.seller.rating },
      metadata: { niche: 'Varies', source: 'Seller', freshness: 'Varies', exclusivityLevel: 'Varies' },
      stats: { rating: listing.seller.rating, lastSoldCount: 0, qualityScore: 95, totalCount: 0, remainingCount: 0, lastUpdated: 'N/A' },
      volume: 'Varies',
      type: 'Varies',
      industry: 'Varies',
      jobTitle: 'Varies',
      previewRecords: [],
    },
    {
      id: 'suggested-3',
      title: 'Lists with Phone Enrichment',
      description: 'Find lists where phone numbers are available as an enrichment.',
      price: 0,
      isVerified: true,
      seller: { id: 'seller-auto-2', name: 'System Recommends', rating: 4.8 },
      metadata: { niche: 'Varies', source: 'System', freshness: 'Varies', exclusivityLevel: 'Varies' },
      stats: { rating: 4.8, lastSoldCount: 0, qualityScore: 92, totalCount: 0, remainingCount: 0, lastUpdated: 'N/A' },
      volume: 'Varies',
      type: 'Email/Phone',
      industry: 'Varies',
      jobTitle: 'Varies',
      previewRecords: [],
    },
  ];

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

  const handleEnrichmentsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      showAuthModal();
      return;
    }
    setShowEnrichments(true);
  };

  const handleApplyEnrichments = (selectedEnrichments: string[]) => {
    console.log('Applying enrichments:', selectedEnrichments);
    setShowEnrichments(false);
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      {/* Header Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 border-b border-gray-100"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-2 mb-2"
            >
              <h1 className="text-2xl font-bold text-gray-900 truncate">{listing.title}</h1>
              <motion.div variants={badgeVariants}>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Peeker Verified
                </Badge>
              </motion.div>
            </motion.div>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 line-clamp-2"
            >
              {listing.description}
            </motion.p>
          </div>
          <motion.div variants={badgeVariants} className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              <Lock className="w-3 h-3 mr-1" />
              Limited Availability
            </Badge>
            <Button 
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
              onClick={handleEnrichmentsClick}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Enrichments
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Metadata Tags */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 border-b border-gray-100 bg-gray-50"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: TrendingUp, label: 'Niche', value: listing.metadata.niche, color: 'text-amber-500' },
            { icon: Shield, label: 'Source', value: listing.metadata.source, color: 'text-emerald-500' },
            { icon: Clock, label: 'Freshness', value: listing.metadata.freshness, color: 'text-sky-500' },
            { icon: Star, label: 'Exclusivity', value: listing.metadata.exclusivityLevel, color: 'text-amber-500' }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center space-x-2"
            >
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <div className="min-w-0">
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-medium text-gray-900 truncate">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Stats with Quality Indicators */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 border-b border-gray-100"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              label: 'Quality Score',
              value: listing.stats.qualityScore,
              icon: Star,
              color: 'text-emerald-500',
              progress: true
            },
            {
              label: 'Verification Rate',
              value: '98% Verified',
              icon: CheckCircle2,
              color: 'text-emerald-500'
            },
            {
              label: 'Availability',
              value: `${listing.stats.remainingCount} remaining`,
              icon: Users,
              color: 'text-amber-500'
            },
            {
              label: 'Last Updated',
              value: listing.stats.lastUpdated,
              icon: Clock,
              color: 'text-sky-500'
            }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="flex flex-col"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <div className="flex items-center space-x-2">
                {stat.progress ? (
                  <>
                    <Progress value={stat.value} className="w-20 h-2" />
                    <span className="font-medium text-gray-900">{stat.value}/100</span>
                  </>
                ) : (
                  <>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="font-medium text-gray-900">{stat.value}</span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Preview Records */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 border-b border-gray-100"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <motion.div variants={itemVariants}>
            <h2 className="text-lg font-semibold text-gray-900">Preview Records</h2>
            <p className="text-sm text-gray-500">Sample of verified contacts from this exclusive list</p>
          </motion.div>
          <motion.button
            variants={itemVariants}
            onClick={() => addColumn('phone')}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Column
          </motion.button>
        </div>

        <motion.div 
          variants={containerVariants}
          className="overflow-x-auto rounded-lg border border-gray-200"
        >
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <motion.tr key={headerGroup.id} variants={itemVariants}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </motion.tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <motion.tr 
                  key={row.id} 
                  variants={itemVariants}
                  className="hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>

      {/* Suggested Lists Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 border-b border-gray-100 bg-gray-50"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Lists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestedLists.map((suggestedListing) => (
            <ListingCard 
              key={suggestedListing.id}
              listing={suggestedListing as Listing}
              onRequestList={async () => {}}
              isLoading={false}
            />
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 border-b border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 border-t border-gray-100 bg-gray-50"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div variants={itemVariants} className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Limited Availability</span>
              <span>{listing.stats.remainingCount} spots left</span>
            </div>
            <Progress value={(listing.stats.totalCount - listing.stats.remainingCount) / listing.stats.totalCount * 100} className="h-2" />
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleRequestList}
              disabled={isLoading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
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
            <Button
              variant="outline"
              className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
              onClick={handleEnrichmentsClick}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Enrichments
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <EnrichmentsPopup
        isOpen={showEnrichments}
        onClose={() => setShowEnrichments(false)}
        onApply={handleApplyEnrichments}
        totalLeads={parseInt(listing.volume)}
      />
    </motion.div>
  );
} 