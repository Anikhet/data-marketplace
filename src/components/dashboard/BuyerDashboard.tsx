'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/contexts/dashboard-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import Glow from '@/components/ui/glow';
import { 
  Building2, 
  // TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  Star,
  RefreshCw,
  ArrowRight,
  // Sparkles,
  Search,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PurchaseHistory {
  id: string;
  title: string;
  purchaseDate: string;
  price: number;
  lastVerified: string;
  verificationScore: number;
  cardLast4: string;
  status: 'active' | 'expired' | 'pending';
}

interface ListSuggestion {
  id: string;
  name: string;
  freshness: number;
  suggestedAction: string;
  potentialImpact: string;
}

interface FilterState {
  industry: string[];
  status: string[];
  priceRange: [number, number];
  freshness: string;
  verificationScore: number;
  lastUpdated: string;
}

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

const mockPurchaseHistory: PurchaseHistory[] = [
  {
    id: "1",
    title: "Tech Industry C-Level Executives 2024",
    purchaseDate: "2024-03-15",
    price: 999,
    lastVerified: "2024-03-15",
    verificationScore: 95,
    cardLast4: "4242",
    status: 'active'
  },
  {
    id: "2",
    title: "Healthcare Decision Makers",
    purchaseDate: "2024-02-01",
    price: 799,
    lastVerified: "2024-02-01",
    verificationScore: 85,
    cardLast4: "4242",
    status: 'expired'
  }
];

const listSuggestions: ListSuggestion[] = [
  {
    id: '1',
    name: 'Tech CEOs 2024',
    freshness: 85,
    suggestedAction: 'Re-verify contact information',
    potentialImpact: 'Increase response rate by 15%'
  },
  {
    id: '2',
    name: 'Startup Founders Q1',
    freshness: 65,
    suggestedAction: 'Update company information',
    potentialImpact: 'Improve targeting accuracy'
  }
];

export default function BuyerDashboard() {
  const { buyerStats } = useDashboard();
  // const [activeTab, setActiveTab] = useState('purchases');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    industry: [],
    status: [],
    priceRange: [0, 10000],
    freshness: 'any',
    verificationScore: 0,
    lastUpdated: 'any'
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    industry: false,
    status: false,
    price: false,
    freshness: false,
    verification: false
  });

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
    'Real Estate',
    'Media & Entertainment'
  ];

  const statuses = ['active', 'expired', 'pending'];

  const needsVerification = mockPurchaseHistory.filter(
    purchase => {
      const daysSinceVerification = Math.floor(
        (new Date().getTime() - new Date(purchase.lastVerified).getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysSinceVerification > 30;
    }
  );

  const filteredPurchases = mockPurchaseHistory.filter(purchase => {
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const searchableText = [
        purchase.title,
        purchase.purchaseDate,
        purchase.status
      ].map(text => String(text).toLowerCase()).join(' ');
      if (!searchableText.includes(query)) return false;
    }

    // Industry filter
    if (filters.industry.length > 0 && !filters.industry.includes(purchase.title.split(' ')[0])) {
      return false;
    }

    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(purchase.status)) {
      return false;
    }

    // Price range filter
    if (purchase.price < filters.priceRange[0] || purchase.price > filters.priceRange[1]) {
      return false;
    }

    // Verification score filter
    if (purchase.verificationScore < filters.verificationScore) {
      return false;
    }

    return true;
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ 
    title, 
    children, 
    sectionKey 
  }: { 
    title: string; 
    children: React.ReactNode; 
    sectionKey: string;
  }) => (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50/50 rounded-lg px-2 transition-colors duration-200"
      >
        <span className="font-medium text-gray-900">{title}</span>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="pb-4 space-y-3 px-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 relative overflow-hidden"
    >
      <Glow variant="top" className="opacity-30" />
      
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-gray-900"
      >
        Buyer Dashboard
      </motion.h1>
      
      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {[
          { title: 'Total Listings', value: buyerStats.totalListings, icon: Building2, color: 'text-blue-500' },
          { title: 'Active Requests', value: buyerStats.activeRequests, icon: Clock, color: 'text-amber-500' },
          { title: 'Completed Requests', value: buyerStats.completedRequests, icon: CheckCircle2, color: 'text-emerald-500' },
          { title: 'List Freshness', value: '85%', icon: Star, color: 'text-purple-500', badge: 'Good' }
        ].map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm border-gray-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <motion.div
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold text-gray-900"
                    >
                      {stat.value}
                    </motion.div>
                    {stat.badge && (
                      <motion.div variants={badgeVariants}>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          {stat.badge}
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        {/* Left Column: Purchases/Requests */}
        <div className="space-y-6">
          {/* Search and Filters */}
          <Card className="bg-white/50 backdrop-blur-sm border-gray-100">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search purchases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 h-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Filters */}
                <div className="space-y-2">
                  <FilterSection title="Industry" sectionKey="industry">
                    <div className="grid grid-cols-2 gap-1.5">
                      {industries.map((industry) => (
                        <Button
                          key={industry}
                          variant={filters.industry.includes(industry) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const newIndustries = filters.industry.includes(industry)
                              ? filters.industry.filter((i) => i !== industry)
                              : [...filters.industry, industry];
                            setFilters(prev => ({ ...prev, industry: newIndustries }));
                          }}
                          className={cn(
                            "justify-center h-8 text-xs transition-all duration-200 w-full truncate px-2",
                            filters.industry.includes(industry)
                              ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                              : "hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200"
                          )}
                        >
                          {industry}
                        </Button>
                      ))}
                    </div>
                  </FilterSection>

                  <FilterSection title="Status" sectionKey="status">
                    <div className="grid grid-cols-2 gap-1.5">
                      {statuses.map((status) => (
                        <Button
                          key={status}
                          variant={filters.status.includes(status) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const newStatuses = filters.status.includes(status)
                              ? filters.status.filter((s) => s !== status)
                              : [...filters.status, status];
                            setFilters(prev => ({ ...prev, status: newStatuses }));
                          }}
                          className={cn(
                            "justify-center h-8 text-xs transition-all duration-200 w-full truncate px-2",
                            filters.status.includes(status)
                              ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                              : "hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200"
                          )}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </FilterSection>

                  <FilterSection title="Price Range" sectionKey="price">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">${filters.priceRange[0]}</span>
                        <span className="text-gray-500">${filters.priceRange[1]}</span>
                      </div>
                      <Slider
                        value={filters.priceRange}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                        min={0}
                        max={10000}
                        step={100}
                        className="w-full"
                      />
                    </div>
                  </FilterSection>

                  <FilterSection title="Verification Score" sectionKey="verification">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Minimum Score: {filters.verificationScore}%</span>
                      </div>
                      <Slider
                        value={[filters.verificationScore]}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, verificationScore: value[0] }))}
                        min={0}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </FilterSection>

                  <FilterSection title="Data Freshness" sectionKey="freshness">
                    <Select
                      value={filters.freshness}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, freshness: value }))}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select freshness" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="daily">Updated Daily</SelectItem>
                        <SelectItem value="weekly">Updated Weekly</SelectItem>
                        <SelectItem value="monthly">Updated Monthly</SelectItem>
                        <SelectItem value="quarterly">Updated Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </FilterSection>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase History */}
          <Card className="bg-white/50 backdrop-blur-sm border-gray-100">
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {filteredPurchases.map((purchase) => (
                  <Card key={purchase.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{purchase.title}</h3>
                          <p className="text-sm text-gray-500">
                            Purchased on {new Date(purchase.purchaseDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={purchase.status === 'active' ? 'default' : 'secondary'}
                          className={purchase.status === 'active' ? 'bg-orange-100 text-orange-700' : ''}
                        >
                          {purchase.status === 'active' ? 'Active' : 'Expired'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Price Paid</p>
                          <p className="font-medium">${purchase.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Card Used</p>
                          <p className="font-medium">•••• {purchase.cardLast4}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            Last verified: {new Date(purchase.lastVerified).toLocaleDateString()}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-orange-600 border-orange-200 hover:bg-orange-50"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Re-verify
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </CardContent>
          </Card>

          {/* List Suggestions */}
          <Card className="bg-white/50 backdrop-blur-sm border-gray-100">
            <CardHeader>
              <CardTitle>List Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {listSuggestions.map((suggestion) => (
                  <motion.div
                    key={suggestion.id}
                    variants={itemVariants}
                    className="p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{suggestion.name}</h4>
                      <Badge variant={suggestion.freshness > 80 ? 'secondary' : 'outline'}
                        className={suggestion.freshness > 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}>
                        {suggestion.freshness}% Fresh
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-gray-600">{suggestion.suggestedAction}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">{suggestion.potentialImpact}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4 hover:bg-gray-50">
                      View Details
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Upsells and Suggestions */}
        <div className="space-y-6 mt-17">
          {/* Verification Reminder */}
          {needsVerification.length > 0 && (
            <Card className="bg-orange-50 border-orange-100">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Data Verification Needed
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {needsVerification.length} of your lists haven&apos;t been verified in over 30 days.
                      Keep your data fresh and accurate.
                    </p>
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => {/* TODO: Implement bulk verification */}}
                    >
                      Verify All Lists
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Agency Partnership */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Building2 className="h-5 w-5 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Partner with Top Agencies
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Connect with our network of expert agencies to maximize the value of your data.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full text-orange-600 border-orange-200 hover:bg-orange-50"
                  >
                    Explore Partnerships
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
} 