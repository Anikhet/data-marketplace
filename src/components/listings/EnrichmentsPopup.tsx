import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Building2, Users, Target, Globe, Briefcase, Sparkles, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Enrichment {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ElementType;
}

interface EnrichmentsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedEnrichments: string[]) => void;
  totalLeads: number;
}

const enrichments: Enrichment[] = [
  {
    id: "company-normalization",
    name: "Find Phone Numbers",
    description: "Get direct phone numbers for the people you want to reach",
    price: 0.05,
    icon: Building2
  },
  {
    id: "industry-identification",
    name: "What They Sell",
    description: "Learn what products and services each company offers",
    price: 0.08,
    icon: Briefcase
  },
  {
    id: "target-customer",
    name: "Target Customer Profile",
    description: "Find companies that are most likely to buy from you",
    price: 0.12,
    icon: Target
  },
  {
    id: "tech-stack",
    name: "Custom Data",
    description: "Add any specific information you need about these companies",
    price: 0.10,
    icon: Sparkles
  },
  {
    id: "decision-makers",
    name: "Decision Maker Contacts",
    description: "Get email addresses and LinkedIn profiles of key decision makers",
    price: 0.15,
    icon: Users
  },
  {
    id: "company-health",
    name: "Company Health Score",
    description: "Financial health indicators and growth signals",
    price: 0.09,
    icon: Target
  },
  {
    id: "buying-signals",
    name: "Buying Signals",
    description: "Recent funding, hiring, or expansion activities",
    price: 0.11,
    icon: Sparkles
  },
  {
    id: "competitor-info",
    name: "Competitor Information",
    description: "See who their current vendors and competitors are",
    price: 0.13,
    icon: Briefcase
  },
  {
    id: "social-presence",
    name: "Social Media Presence",
    description: "Active social media accounts and engagement metrics",
    price: 0.07,
    icon: Globe
  },
  {
    id: "company-news",
    name: "Recent Company News",
    description: "Latest press releases, news, and company updates",
    price: 0.06,
    icon: Building2
  }
];

export default function EnrichmentsPopup({ isOpen, onClose, onApply, totalLeads }: EnrichmentsPopupProps) {
  const [selectedEnrichments, setSelectedEnrichments] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const totalPrice = selectedEnrichments.reduce((sum, id) => {
    const enrichment = enrichments.find(e => e.id === id);
    return sum + (enrichment ? enrichment.price * totalLeads : 0);
  }, 0);

  const filteredEnrichments = enrichments.filter(enrichment => 
    enrichment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enrichment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (id: string) => {
    setSelectedEnrichments(prev => 
      prev.includes(id) 
        ? prev.filter(e => e !== id)
        : [...prev, id]
    );
  };

  const handleClearAll = () => {
    setSelectedEnrichments([]);
  };

  const handleClose = () => {
    setSelectedEnrichments([]);
    setSearchQuery("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
        <DialogHeader className="flex-none">
          <DialogTitle className="text-xl font-semibold">
            Enhance Your List with AI-Powered Enrichments
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-none">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Total leads in list: {totalLeads.toLocaleString()}
              </div>
              {selectedEnrichments.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search enrichments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto mt-4 pr-2">
            <div className="grid gap-4">
              {filteredEnrichments.map((enrichment) => (
                <div 
                  key={enrichment.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:border-orange-200 transition-colors"
                >
                  <Checkbox
                    id={enrichment.id}
                    checked={selectedEnrichments.includes(enrichment.id)}
                    onCheckedChange={() => handleToggle(enrichment.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={enrichment.id}
                        className="font-medium text-gray-900 cursor-pointer"
                      >
                        {enrichment.name}
                      </label>
                      <span className="text-sm text-orange-600 font-medium">
                        ${enrichment.price.toFixed(2)} per lead
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {enrichment.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredEnrichments.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No enrichments found matching your search
              </div>
            )}
          </div>

          <div className="flex-none border-t border-gray-100 pt-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-900">Total Enrichment Cost:</span>
              <span className="text-lg font-semibold text-orange-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={() => onApply(selectedEnrichments)}
                disabled={selectedEnrichments.length === 0}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Apply Enrichments
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 