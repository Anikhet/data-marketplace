'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Target, Bot, Zap } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import your grid components (we'll create these next)
import { ListsGrid } from "./grids/ListsGrid";
import { CampaignsGrid } from "./grids/CampaignsGrid";
import { ScrapersGrid } from "./grids/ScrapersGrid";
import { AutomationsGrid } from "./grids/AutomationsGrid";

export type TabValue = 'lists' | 'campaigns' | 'scrapers' | 'automations';

export function DataGridTabs() {
  const [activeTab, setActiveTab] = useState<TabValue>('lists');

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="space-y-6">
      <TabsList className="bg-white/50 backdrop-blur-sm">
        <TabsTrigger value="lists" className="flex items-center gap-2">
          <List className="w-4 h-4" />
          Lists
        </TabsTrigger>
        <TabsTrigger value="campaigns" className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          Campaigns
        </TabsTrigger>
        <TabsTrigger value="scrapers" className="flex items-center gap-2">
          <Bot className="w-4 h-4" />
          Scrapers
        </TabsTrigger>
        <TabsTrigger value="automations" className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Automations
        </TabsTrigger>
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
            {activeTab === 'lists' && <ListsGrid />}
            {activeTab === 'campaigns' && <CampaignsGrid />}
            {activeTab === 'scrapers' && <ScrapersGrid />}
            {activeTab === 'automations' && <AutomationsGrid />}
          </motion.div>
        </TabsContent>
      </AnimatePresence>
    </Tabs>
  );
} 