import Filters from "./filters/index";
import { HeroSection } from "./HeroSection";
import { useListingsContext } from "@/contexts/listings-context";
import { ListingsGrid } from "./ListingGrid";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Target, Bot, Zap, Users } from "lucide-react";
import { useState } from "react";
// import { ListsGrid } from "../grids/ListsGrid";
import { CampaignsGrid } from "../grids/CampaignsGrid";
import { ScrapersGrid } from "../grids/ScrapersGrid";
import { AutomationsGrid } from "../grids/AutomationsGrid";
import { ExpertsGrid } from "../grids/ExpertsGrid";

export default function SearchSection() {
  const {
    filteredListings,
    isLoading,
    searchQuery,
    applyFilters,
    handleRequestList,
    activeFilters,
  } = useListingsContext();

  const [activeTab, setActiveTab] = useState<'lists' | 'campaigns' | 'scrapers' | 'automations' | 'experts'>('lists');

  const activeFilterCount = Object.values(activeFilters).reduce(
    (count, value) => {
      if (Array.isArray(value)) {
        return count + value.length;
      }
      if (typeof value === "boolean" && value) {
        return count + 1;
      }
      if (typeof value === "string" && value !== "any") {
        return count + 1;
      }
      return count;
    },
    0
  );

  return (
    <div>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters column */}
          <div className="lg:col-span-1">
            <Filters onFilterChange={applyFilters} />
          </div>

          {/* Right column: Content */}
          <div className="lg:col-span-3 flex flex-col space-y-6">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="space-y-6">
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
                <TabsTrigger value="experts" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Experts
                </TabsTrigger>
              </TabsList>

              {activeTab === 'lists' && (
                <ListingsGrid
                  listings={filteredListings}
                  isLoading={isLoading}
                  isFiltering={activeFilterCount > 0}
                  searchQuery={searchQuery}
                  activeFilterCount={activeFilterCount}
                  onRequestList={handleRequestList}
                />
              )}
              {activeTab === 'campaigns' && <CampaignsGrid />}
              {activeTab === 'scrapers' && <ScrapersGrid />}
              {activeTab === 'automations' && <AutomationsGrid />}
              {activeTab === 'experts' && <ExpertsGrid />}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
