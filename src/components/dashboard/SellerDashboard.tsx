'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/contexts/dashboard-context';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import Glow from '@/components/ui/glow';
import { 

  Star, 
  TrendingUp, 
  Users,
  Trophy,
  Target,
  FileUp,
  BarChart3,
  DollarSign,

  Upload,
  Sparkles,

} from 'lucide-react';
import { useState } from 'react';

interface Sale {
  id: string;
  title: string;
  date: string;
  amount: number;
  commission: number;
  status: 'completed' | 'pending' | 'failed';
}

interface Listing {
  id: string;
  title: string;
  price: number;
  leads: number;
  status: 'active' | 'draft' | 'pending';
  lastUpdated: string;
}

interface CommissionTier {
  tier: number;
  salesRequired: number;
  commission: number;
  description: string;
}

const mockSales: Sale[] = [
  {
    id: "1",
    title: "Tech Industry C-Level Executives 2024",
    date: "2024-03-15",
    amount: 999,
    commission: 99.90,
    status: 'completed'
  },
  {
    id: "2",
    title: "Healthcare Decision Makers",
    date: "2024-03-10",
    amount: 799,
    commission: 79.90,
    status: 'completed'
  }
];

const mockListings: Listing[] = [
  {
    id: "1",
    title: "Tech Industry C-Level Executives 2024",
    price: 999,
    leads: 5000,
    status: 'active',
    lastUpdated: "2024-03-15"
  },
  {
    id: "2",
    title: "Healthcare Decision Makers",
    price: 799,
    leads: 3000,
    status: 'active',
    lastUpdated: "2024-03-10"
  }
];

const commissionTiers: CommissionTier[] = [
  {
    tier: 1,
    salesRequired: 0,
    commission: 10,
    description: "Starting tier"
  },
  {
    tier: 2,
    salesRequired: 10,
    commission: 12,
    description: "10+ sales"
  },
  {
    tier: 3,
    salesRequired: 20,
    commission: 15,
    description: "20+ sales"
  },
  {
    tier: 4,
    salesRequired: 50,
    commission: 18,
    description: "50+ sales"
  },
  {
    tier: 5,
    salesRequired: 100,
    commission: 20,
    description: "100+ sales"
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



  const completedSales = mockSales.filter(sale => sale.status === 'completed').length;


  // Calculate progress to next tier
  const nextTier = commissionTiers.find(tier => tier.tier === currentTier.tier + 1);
  const progressToNextTier = nextTier 
    ? (completedSales - currentTier.salesRequired) / (nextTier.salesRequired - currentTier.salesRequired) * 100
    : 100;

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
          { title: 'Commission Tier', value: currentTier.description, icon: Trophy, color: 'text-amber-500', badge: `${currentTier.commission}%` },
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
                    <div className="flex items-start space-x-3 mb-6">
                      <Trophy className="h-5 w-5 text-orange-500 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Commission Tier
                        </h3>
                        <p className="text-2xl font-bold text-orange-600">
                          {currentTier.commission}%
                        </p>
                        <p className="text-sm text-gray-600">
                          {currentTier.description}
                        </p>
                      </div>
                    </div>

                    {nextTier && (
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Progress to {nextTier.commission}%</span>
                          <span className="text-sm font-semibold text-orange-600">{Math.round(progressToNextTier)}%</span>
                        </div>
                        <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressToNextTier}%` }}
                          />
                          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{currentTier.salesRequired} sales</span>
                          <span>{nextTier.salesRequired} sales</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          {nextTier.salesRequired - completedSales} more sales needed for next tier
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      {commissionTiers.map((tier) => (
                        <div
                          key={tier.tier}
                          className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                            tier.tier === currentTier.tier
                              ? 'bg-orange-50 border border-orange-100 shadow-sm'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              tier.tier === currentTier.tier
                                ? 'bg-orange-100 text-orange-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              <Target className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900">{tier.description}</span>
                              <p className="text-xs text-gray-500">{tier.salesRequired} sales required</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-semibold ${
                              tier.tier === currentTier.tier
                                ? 'text-orange-600'
                                : 'text-gray-600'
                            }`}>
                              {tier.commission}%
                            </span>
                            {tier.tier === currentTier.tier && (
                              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                                Current
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="h-4 w-4 text-orange-500" />
                        <h4 className="font-medium text-gray-900">Commission Bonus</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Earn an additional 2% commission on all sales when you maintain a 4.5+ star rating
                      </p>
                    </div>
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
                      {mockListings.map((listing) => (
                        <motion.div
                          key={listing.id}
                          variants={itemVariants}
                        >
                          <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm border-gray-100">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg text-gray-900">{listing.title}</h3>
                                <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                                  <Star className="w-3 h-3 mr-1" />
                                  {listing.leads.toLocaleString()} leads
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Users className="w-4 h-4 mr-1" />
                                  {listing.price.toLocaleString()}
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {new Date(listing.lastUpdated).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                <Badge
                                  variant="default"
                                  className="bg-orange-100 text-orange-700"
                                >
                                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                </Badge>
                              </div>
                              <Button 
                                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-300"
                                variant="outline"
                              >
                                <Upload className="w-4 h-4 mr-2" />
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