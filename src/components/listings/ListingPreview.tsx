import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  CellContext,
} from '@tanstack/react-table';
import { Plus, Clock, AlertCircle, Star, CheckCircle2, Users, Lock } from 'lucide-react';
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
  const [selectedColumns] = useState<string[]>(['name', 'title', 'company', 'email']);
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
              <h1 className="text-4xl font-bold text-gray-900 truncate">{listing.title}</h1>
              <motion.div variants={badgeVariants}>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Peeker Verified
                </Badge>
              </motion.div>
            </motion.div>
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground  text-base leading-relaxed max-w-3xl"
            >
              {listing.description}
            </motion.p>
          </div>
          <motion.div variants={badgeVariants} className="flex flex-col items-end gap-3">
            <Badge variant="outline" className="bg-amber-50/80 text-amber-700 border-amber-200/50 px-4 py-2 backdrop-blur-sm">
              <Lock className="w-4 h-4 mr-2" />
              Limited Availability
            </Badge>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Stats with Quality Indicators */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 border-b border-gray-100/50 bg-gradient-to-br from-gray-50/30 via-white to-gray-50/30"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
              className="flex flex-col p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 border border-gray-100/50"
            >
              <p className="text-sm font-medium text-gray-500 mb-4">{stat.label}</p>
              <div className="flex items-center space-x-4">
                {stat.progress ? (
                  <>
                    <Progress value={stat.value} className="w-32 h-1.5 bg-gray-100/50" />
                    <span className="font-semibold text-gray-900">{stat.value}/100</span>
                  </>
                ) : (
                  <>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="font-semibold text-gray-900">{stat.value}</span>
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
        className="p-12 border-b border-gray-100/50"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 mb-10">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Instant Access to Premium Contacts</h2>
            <p className="text-gray-600 text-lg">Exclusive verified contacts with instant enrichment options</p>
          </motion.div>
    
          <Button 
            variant="outline"
            className="border-orange-200/50 text-orange-600 hover:bg-orange-50/50 hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-8 py-3 backdrop-blur-sm"
            onClick={handleEnrichmentsClick}
          >
            <Plus className="h-5 w-5 mr-2" />
            Unlock Premium Enrichments
          </Button>
        </div>

        <motion.div 
          variants={containerVariants}
          className="overflow-x-auto rounded-2xl border border-gray-200/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)]"
        >
          <table className="min-w-full divide-y divide-gray-200/50 text-sm">
            <thead className="bg-gray-50/50 backdrop-blur-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <motion.tr key={headerGroup.id} variants={itemVariants}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                  <th className="px-8 py-5 text-left text-xs font-semibold text-orange-600 uppercase tracking-wider bg-orange-50/30 backdrop-blur-sm">
                    Premium Enrichments
                  </th>
                </motion.tr>
              ))}
            </thead>
            <tbody className="bg-white/80 backdrop-blur-sm divide-y divide-gray-200/50">
              {table.getRowModel().rows.map((row) => (
                <motion.tr 
                  key={row.id} 
                  variants={itemVariants}
                  className="hover:bg-gray-50/30 transition-colors duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-8 py-5 whitespace-nowrap text-sm text-gray-700"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                  <td className="px-8 py-5 whitespace-nowrap text-sm bg-orange-50/30">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-100/30 transition-all duration-200"
                      onClick={handleEnrichmentsClick}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </td>
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
        className="p-12 border-b border-gray-100/50 bg-gradient-to-br from-gray-50/30 via-white to-gray-50/30"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Suggested Lists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
        className="p-12 border-b border-gray-100/50"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200/50 rounded-2xl px-6 hover:shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-lg font-medium py-5">{item.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-5">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-12 border-t border-gray-100/50 bg-gradient-to-br from-gray-50/30 via-white to-gray-50/30"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span className="font-medium">Limited Availability</span>
              <span className="font-medium">{listing.stats.remainingCount} spots left</span>
            </div>
            <Progress value={(listing.stats.totalCount - listing.stats.remainingCount) / listing.stats.totalCount * 100} className="h-1.5 bg-gray-100/50" />
          </motion.div>
        </div>
      </motion.div>

{/* Sexy Fixed Bottom CTA */}
<motion.div
  initial={{ y: 100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: 100, opacity: 0 }}
  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
  className="fixed bottom-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-t border-gray-200 px-6 py-5 shadow-[0_-12px_20px_rgba(0,0,0,0.05)]"
>
  <div className="mx-auto flex w-full max-w-4xl flex-col sm:flex-row items-center gap-4">
    
    <Button
      onClick={handleRequestList}
      disabled={isLoading}
      className=" cursor-pointer w-full sm:w-auto flex-1 text-lg py-5 rounded-xl bg-[#fb923c] hover:bg-[#f97316] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full bg-white/60" />
          <span>Processing...</span>
        </div>
      ) : (
        'Request This List'
      )}
    </Button>

    <Button
      variant="ghost"
      onClick={handleEnrichmentsClick}
      className="cursor-pointer w-full sm:w-auto flex-1 text-lg py-5 rounded-xl border border-[#f97316] text-[#f97316] hover:bg-orange-50 font-semibold transition-all duration-300"
    >
      <Plus className="h-5 w-5 mr-2" />
      Add Enrichments
    </Button>
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