'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/contexts/dashboard-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import Glow from '@/components/ui/glow';
import { 
  Building2, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  Star,
  RefreshCw,

  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
// import { Progress } from "@/components/ui/progress";

interface ListSuggestion {
  id: string;
  name: string;
  freshness: number;
  suggestedAction: string;
  potentialImpact: string;
}



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

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
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



export default function BuyerDashboard() {
  const { buyerStats } = useDashboard();
  const [activeTab, setActiveTab] = useState('overview');


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

  // const recentPurchases: Purchase[] = [
  //   {
  //     id: '1',
  //     date: '2024-03-15',
  //     listName: 'Tech CEOs 2024',
  //     amount: 299.99,
  //     status: 'completed'
  //   },
  //   {
  //     id: '2',
  //     date: '2024-03-10',
  //     listName: 'Startup Founders Q1',
  //     amount: 199.99,
  //     status: 'completed'
  //   }
  // ];

  const needsVerification = mockPurchaseHistory.filter(
    purchase => {
      const daysSinceVerification = Math.floor(
        (new Date().getTime() - new Date(purchase.lastVerified).getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysSinceVerification > 30;
    }
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
          <div className="grid grid-cols-[2fr_1fr]  gap-6">
        {/* Left Column: Purchases/Requests */}
          
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TabsList className="bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="purchases">Purchase History</TabsTrigger>
            <TabsTrigger value="suggestions">List Suggestions</TabsTrigger>
          </TabsList>
        </motion.div>

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
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {/* List Health Overview */}
                  <motion.div variants={cardVariants}>
                    <Card className="bg-white/50 backdrop-blur-sm border-gray-100">
                      <CardHeader>
                        <CardTitle>List Health Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <motion.div 
                          variants={containerVariants}
                          className="space-y-4"
                        >
                          {listSuggestions.map((suggestion) => (
                            <motion.div
                              key={suggestion.id}
                              variants={itemVariants}
                              whileHover={{ scale: 1.01 }}
                              className="flex items-start space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex-1">
                                <motion.h4 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                  className="font-medium text-gray-900"
                                >
                                  {suggestion.name}
                                </motion.h4>
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3 }}
                                  className="flex items-center space-x-2 mt-1"
                                >
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-500">
                                    Freshness: {suggestion.freshness}%
                                  </span>
                                </motion.div>
                                <motion.p 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.4 }}
                                  className="text-sm text-gray-600 mt-2"
                                >
                                  {suggestion.suggestedAction}
                                </motion.p>
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button variant="outline" size="sm" className="hover:bg-gray-50">
                                  Take Action
                                </Button>
                              </motion.div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>

         
                </motion.div>
              )}

              {activeTab === 'purchases' && (
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
                      {mockPurchaseHistory.map((purchase) => (
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
              )}

              {activeTab === 'suggestions' && (
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
              )}
             
  
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
     

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
                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                    onClick={() => {/* TODO: Implement agency connection */}}
                  >
                    Find an Agency
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Features */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Sparkles className="h-5 w-5 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Upgrade to Premium
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get access to advanced features, priority support, and exclusive data sets.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                    onClick={() => {/* TODO: Implement upgrade flow */}}
                  >
                    View Premium Features
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

               {/* Partner Services */}
                  <motion.div variants={cardVariants}>
                    <Card className="bg-white/50 backdrop-blur-sm border-gray-100">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Partner Services</CardTitle>
                          <motion.div variants={badgeVariants}>
                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                              Available
                            </Badge>
                          </motion.div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <motion.div 
                          variants={containerVariants}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          {[
                            {
                              icon: Building2,
                              title: 'Data Verification',
                              description: 'Ensure your list data is accurate and up-to-date with our verification service.',
                              color: 'text-blue-500'
                            },
                            {
                              icon: TrendingUp,
                              title: 'List Enhancement',
                              description: 'Add valuable insights and additional data points to your existing lists.',
                              color: 'text-emerald-500'
                            }
                          ].map((service) => (
                            <motion.div
                              key={service.title}
                              variants={itemVariants}
                              whileHover={{ scale: 1.02 }}
                              className="p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
                            >
                              <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center space-x-2 mb-2"
                              >
                                <service.icon className={`w-5 h-5 ${service.color}`} />
                                <h4 className="font-medium text-gray-900">{service.title}</h4>
                              </motion.div>
                              <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-sm text-gray-600 mb-4"
                              >
                                {service.description}
                              </motion.p>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button variant="outline" className="w-full hover:bg-gray-50">
                                  Learn More
                                </Button>
                              </motion.div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>

    

   
   
    </motion.div>
  );
} 