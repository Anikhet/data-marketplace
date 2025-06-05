import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Building2, Users, Target, Globe, Briefcase, Sparkles } from "lucide-react";

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
    name: "Company Name Normalization",
    description: "Standardize company names and identify subsidiaries",
    price: 0.05,
    icon: Building2
  },
  {
    id: "industry-identification",
    name: "Industry Classification",
    description: "AI-powered industry categorization and sub-industry mapping",
    price: 0.08,
    icon: Briefcase
  },
  {
    id: "target-customer",
    name: "Target Customer Profile",
    description: "Identify ideal customer profiles and buying signals",
    price: 0.12,
    icon: Target
  },
  {
    id: "company-size",
    name: "Company Size & Growth",
    description: "Employee count, revenue range, and growth metrics",
    price: 0.07,
    icon: Users
  },
  {
    id: "geographic",
    name: "Geographic Enrichment",
    description: "HQ location, regional presence, and market coverage",
    price: 0.06,
    icon: Globe
  },
  {
    id: "tech-stack",
    name: "Technology Stack",
    description: "Identify technologies and tools used by the company",
    price: 0.10,
    icon: Sparkles
  }
];

export default function EnrichmentsPopup({ isOpen, onClose, onApply, totalLeads }: EnrichmentsPopupProps) {
  const [selectedEnrichments, setSelectedEnrichments] = useState<string[]>([]);

  const totalPrice = selectedEnrichments.reduce((sum, id) => {
    const enrichment = enrichments.find(e => e.id === id);
    return sum + (enrichment ? enrichment.price * totalLeads : 0);
  }, 0);

  const handleToggle = (id: string) => {
    setSelectedEnrichments(prev => 
      prev.includes(id) 
        ? prev.filter(e => e !== id)
        : [...prev, id]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Enhance Your List with AI-Powered Enrichments
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="text-sm text-gray-500">
            Total leads in list: {totalLeads.toLocaleString()}
          </div>
          
          <div className="grid gap-4">
            {enrichments.map((enrichment) => (
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

          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-900">Total Enrichment Cost:</span>
              <span className="text-lg font-semibold text-orange-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose}>
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