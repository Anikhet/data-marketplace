'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/contexts/dashboard-context';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import Glow from '@/components/ui/glow';
import { 
  Download, 
  Star, 
  TrendingUp, 
  Users,
  Trophy,
  Target,
  FileUp,
  BarChart3,
  DollarSign,

} from 'lucide-react';
import { useState } from 'react';

interface CommissionTier {
  level: number;
  name: string;
  percentage: number;
  requirements: {
    lists: number;
    sales: number;
  };
  nextTier?: {
    lists: number;
    sales: number;
  };
}

interface PeekerDataset {
  id: string;
  title: string;
  description: string;
  size: number;
  quality: number;
  price: number;
  category: string;
  tags: string[];
}

const commissionTiers: CommissionTier[] = [
  {
    level: 1,
    name: 'Bronze',
    percentage: 70,
    requirements: {
      lists: 0,
      sales: 0
    },
    nextTier: {
      lists: 5,
      sales: 3
    }
  },
  {
    level: 2,
    name: 'Silver',
    percentage: 75,
    requirements: {
      lists: 5,
      sales: 3
    },
    nextTier: {
      lists: 15,
      sales: 10
    }
  },
  {
    level: 3,
    name: 'Gold',
    percentage: 80,
    requirements: {
      lists: 15,
      sales: 10
    },
    nextTier: {
      lists: 30,
      sales: 25
    }
  },
  {
    level: 4,
    name: 'Platinum',
    percentage: 85,
    requirements: {
      lists: 30,
      sales: 25
    }
  }
];

const mockPeekerDatasets: PeekerDataset[] = [
  {
    id: '1',
    title: 'Tech Startup Founders 2024',
    description: 'Comprehensive list of tech startup founders and CEOs from emerging companies',
    size: 2500,
    quality: 92,
    price: 499,
    category: 'Technology',
    tags: ['Founders', 'Startups', 'Tech']
  },
  {
    id: '2',
    title: 'Healthcare Professionals Database',
    description: 'Verified healthcare professionals including doctors, specialists, and administrators',
    size: 5000,
    quality: 95,
    price: 799,
    category: 'Healthcare',
    tags: ['Medical', 'Doctors', 'Healthcare']
  },
  {
    id: '3',
    title: 'Finance Industry Decision Makers',
    description: 'C-level executives and decision makers from top financial institutions',
    size: 3000,
    quality: 94,
    price: 699,
    category: 'Finance',
    tags: ['Finance', 'Executives', 'Banking']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

export default function SellerDashboard() {
  const { sellerStats, recentListings } = useDashboard();
  const [activeTab, setActiveTab] = useState('overview');
  const currentTier = commissionTiers[1]; // Example: Silver tier

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'completed':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 relative overflow-hidden">
      <Glow variant="top" className="opacity-30" />
      
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-gray-900"
      >
        Seller Dashboard
      </motion.h1>
      
      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {[
          { title: 'Total Revenue', value: formatCurrency(sellerStats.revenue), icon: DollarSign, color: 'text-emerald-500' },
          { title: 'Commission Tier', value: currentTier.name, icon: Trophy, color: 'text-amber-500', badge: `${currentTier.percentage}%` },
          { title: 'Total Listings', value: sellerStats.totalListings, icon: FileUp, color: 'text-blue-500' },
          { title: 'Completed Sales', value: sellerStats.completedRequests, icon: BarChart3, color: 'text-purple-500' }
        ].map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  {stat.badge && (
                    <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                      {stat.badge}
                    </Badge>
                  )}
                </div>
          </CardContent>
        </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="commission">Commission</TabsTrigger>
          <TabsTrigger value="peeker">Peeker Import</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value={activeTab} className="space-y-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <Card className="bg-white/50 backdrop-blur-sm border-gray-100">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-xl font-semibold text-gray-900">Recent Sales</CardTitle>
        </CardHeader>
                  <CardContent className="pt-6">
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
            {recentListings.map((listing) => (
                        <motion.div
                key={listing.id}
                          variants={itemVariants}
                          className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="space-y-1">
                            <h3 className="font-medium text-gray-900">{listing.listingTitle}</h3>
                  <p className="text-sm text-gray-500">
                    Listed on {new Date(listing.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(listing.status)}>
                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                  </Badge>
                            <span className="font-medium text-gray-900">{formatCurrency(listing.price)}</span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'commission' && (
                <Card className="bg-white/50 backdrop-blur-sm border-gray-100">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-xl font-semibold text-gray-900">Commission Tiers</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      {commissionTiers.map((tier) => (
                        <motion.div
                          key={tier.level}
                          variants={itemVariants}
                          className={`p-4 rounded-lg ${
                            tier.level === currentTier.level 
                              ? 'bg-blue-50 border border-blue-200' 
                              : 'bg-white/50 backdrop-blur-sm border border-gray-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Trophy className={`w-5 h-5 ${
                                tier.level === currentTier.level 
                                  ? 'text-blue-500' 
                                  : 'text-gray-400'
                              }`} />
                              <h4 className="font-medium text-gray-900">{tier.name}</h4>
                            </div>
                            <Badge variant={tier.level === currentTier.level ? 'default' : 'secondary'}
                              className={tier.level === currentTier.level ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}>
                              {tier.percentage}%
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Target className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">
                                {tier.requirements.lists} Lists
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">
                                {tier.requirements.sales} Sales
                              </span>
                            </div>
                          </div>
                          {tier.nextTier && (
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">
                                  Progress to {
                                    (() => {
                                      const nextTierObj = commissionTiers.find(t => t.level === tier.level + 1);
                                      return nextTierObj ? nextTierObj.name : 'Next Tier';
                                    })()
                                  }
                                </span>
                                <span className="text-gray-900">60%</span>
                              </div>
                              <Progress value={60} className="h-2" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'peeker' && (
                <Card className="bg-white/50 backdrop-blur-sm border-gray-100">
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold text-gray-900">Import from Peeker</CardTitle>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        AI-Powered Leads
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {mockPeekerDatasets.map((dataset) => (
                        <motion.div
                          key={dataset.id}
                          variants={itemVariants}
                        >
                          <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm border-gray-100">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg text-gray-900">{dataset.title}</h3>
                                <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                                  <Star className="w-3 h-3 mr-1" />
                                  {dataset.quality}% Quality
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-4">{dataset.description}</p>
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Users className="w-4 h-4 mr-1" />
                                  {dataset.size.toLocaleString()} leads
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {formatCurrency(dataset.price)}
                </div>
              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {dataset.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                                    {tag}
                                  </Badge>
            ))}
          </div>
                              <Button 
                                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-300"
                                variant="outline"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Import Dataset
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
        </CardContent>
      </Card>
              )}
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
} 