import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  sectionKey: string;
  options?: string[];
  isExpanded: boolean;
  onToggle: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeCount: number;
}

export const FilterSection = ({
  title,
  children,
  // sectionKey,
  options,
  isExpanded,
  onToggle,
  searchTerm,
  onSearchChange,
  activeCount
}: FilterSectionProps) => (
  <div className="border-b border-gray-100 last:border-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50/50 rounded-lg px-2 transition-colors duration-200"
    >
      <span className="font-medium text-gray-900 flex items-center gap-2">
        {title}
        {isExpanded && (
          <span className="text-xs text-gray-500 font-normal">
            ({activeCount} selected)
          </span>
        )}
      </span>
      {isExpanded ? (
        <ChevronUp className="h-4 w-4 text-gray-500" />
      ) : (
        <ChevronDown className="h-4 w-4 text-gray-500" />
      )}
    </button>
    {isExpanded && (
      <div className="pb-4 space-y-3 px-2">
        {options && (
          <div 
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => {
                e.stopPropagation();
                onSearchChange(e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              className="pl-8 h-8 text-sm"
            />
          </div>
        )}
        <div onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )}
  </div>
); 