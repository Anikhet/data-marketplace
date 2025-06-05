import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  industry: string[];
  jobTitle: string[];
  volume: string;
  verifiedSellers: boolean;
  listType: string[];
  priceRange: [number, number];
  freshness: string;
  qualityScore: number;
  location: string[];
  companySize: string[];
  seniority: string[];
  lastUpdated: string;
  exclusivityLevel: string[];
}

const FilterButton = ({ 
  selected, 
  onClick, 
  children 
}: { 
  selected: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}) => (
  <Button
    variant={selected ? "default" : "outline"}
    size="sm"
    onClick={onClick}
    className={cn(
      "justify-center h-8 text-xs transition-all duration-200 w-full truncate px-2",
      selected
        ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
        : "hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200"
    )}
  >
    {children}
  </Button>
);

export default function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    industry: [],
    jobTitle: [],
    volume: 'any',
    verifiedSellers: false,
    listType: [],
    priceRange: [0, 10000],
    freshness: 'any',
    qualityScore: 0,
    location: [],
    companySize: [],
    seniority: [],
    lastUpdated: 'any',
    exclusivityLevel: []
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    industry: false,
    jobTitle: false,
    volume: false,
    listType: false,
    price: false,
    quality: false,
    location: false,
    company: false,
    seniority: false,
    exclusivity: false
  });

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
    'Real Estate',
    'Media & Entertainment',
    'Energy',
    'Transportation',
    'Agriculture',
    'Construction',
    'Hospitality',
    'Professional Services',
    'Non-Profit'
  ];

  const jobTitles = [
    'C-Level',
    'VP/Director',
    'Manager',
    'Individual Contributor',
    'Founder',
    'Owner',
    'President',
    'Chief Officer',
    'Head of Department',
    'Team Lead',
    'Senior',
    'Mid-Level',
    'Entry Level'
  ];

  const listTypes = [
    'Email',
    'Phone',
    'LinkedIn',
    'Custom',
    'Social Media',
    'Company',
    'Address'
  ];

  const locations = [
    'North America',
    'Europe',
    'Asia Pacific',
    'Latin America',
    'Middle East',
    'Africa',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'India',
    'China'
  ];

  const companySizes = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1001-5000',
    '5001-10000',
    '10000+'
  ];

  const seniorityLevels = [
    'C-Suite',
    'Executive',
    'Senior Management',
    'Middle Management',
    'Individual Contributor',
    'Entry Level'
  ];

  const exclusivityLevels = [
    'Premium',
    'Standard',
    'Basic',
    'Exclusive',
    'Custom'
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const getActiveFilterCount = (section: string) => {
    switch (section) {
      case 'industry':
        return filters.industry.length;
      case 'jobTitle':
        return filters.jobTitle.length;
      case 'listType':
        return filters.listType.length;
      case 'location':
        return filters.location.length;
      case 'company':
        return filters.companySize.length;
      case 'seniority':
        return filters.seniority.length;
      case 'exclusivity':
        return filters.exclusivityLevel.length;
      case 'freshness':
        return filters.freshness !== 'any' ? 1 : 0;
      case 'quality':
        return filters.qualityScore > 0 ? 1 : 0;
      case 'price':
        return filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0;
      default:
        return 0;
    }
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
        <span className="font-medium text-gray-900 flex items-center gap-2">
          {title}
          {expandedSections[sectionKey] && (
            <span className="text-xs text-gray-500 font-normal">
              ({getActiveFilterCount(sectionKey)} selected)
            </span>
          )}
        </span>
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

  const FilterBadge = ({ 
    label, 
    value, 
    onRemove 
  }: { 
    label: string; 
    value: string; 
    onRemove: () => void;
  }) => (
    <Badge 
      variant="secondary" 
      className="mr-2 mb-2 bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 transition-colors duration-200"
    >
      {label}: {value}
      <button
        onClick={onRemove}
        className="ml-1 hover:text-orange-900 transition-colors duration-200"
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );

  return (
    <Card className="sticky top-24 max-h-[calc(100vh-8rem)] flex flex-col bg-white/50 backdrop-blur-sm border-orange-100">
      <CardHeader className="pb-4 flex-shrink-0 border-b border-orange-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const resetFilters = {
                industry: [],
                jobTitle: [],
                volume: 'any',
                verifiedSellers: false,
                listType: [],
                priceRange: [0, 10000] as [number, number],
                freshness: 'any',
                qualityScore: 0,
                location: [],
                companySize: [],
                seniority: [],
                lastUpdated: 'any',
                exclusivityLevel: []
              };
              setFilters(resetFilters);
              onFilterChange(resetFilters);
            }}
            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
          >
            Clear All
          </Button>
        </div>
        <div className="flex flex-wrap mt-2 max-h-20 overflow-y-auto pr-2">
          {filters.industry.map(industry => (
            <FilterBadge
              key={industry}
              label="Industry"
              value={industry}
              onRemove={() => handleFilterChange('industry', filters.industry.filter(i => i !== industry))}
            />
          ))}
          {filters.jobTitle.map(title => (
            <FilterBadge
              key={title}
              label="Job Title"
              value={title}
              onRemove={() => handleFilterChange('jobTitle', filters.jobTitle.filter(t => t !== title))}
            />
          ))}
          {filters.listType.map(type => (
            <FilterBadge
              key={type}
              label="Type"
              value={type}
              onRemove={() => handleFilterChange('listType', filters.listType.filter(t => t !== type))}
            />
          ))}
          {filters.location.map(location => (
            <FilterBadge
              key={location}
              label="Location"
              value={location}
              onRemove={() => handleFilterChange('location', filters.location.filter(l => l !== location))}
            />
          ))}
          {filters.companySize.map(size => (
            <FilterBadge
              key={size}
              label="Size"
              value={size}
              onRemove={() => handleFilterChange('companySize', filters.companySize.filter(s => s !== size))}
            />
          ))}
          {filters.seniority.map(level => (
            <FilterBadge
              key={level}
              label="Seniority"
              value={level}
              onRemove={() => handleFilterChange('seniority', filters.seniority.filter(s => s !== level))}
            />
          ))}
          {filters.exclusivityLevel.map(level => (
            <FilterBadge
              key={level}
              label="Exclusivity"
              value={level}
              onRemove={() => handleFilterChange('exclusivityLevel', filters.exclusivityLevel.filter(e => e !== level))}
            />
          ))}
          {filters.freshness !== 'any' && (
            <FilterBadge
              label="Freshness"
              value={filters.freshness}
              onRemove={() => handleFilterChange('freshness', 'any')}
            />
          )}
          {filters.qualityScore > 0 && (
            <FilterBadge
              label="Quality"
              value={`${filters.qualityScore}%+`}
              onRemove={() => handleFilterChange('qualityScore', 0)}
            />
          )}
          {filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? (
            <FilterBadge
              label="Price"
              value={`$${filters.priceRange[0]}-$${filters.priceRange[1]}`}
              onRemove={() => handleFilterChange('priceRange', [0, 10000])}
            />
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-2 overflow-y-auto flex-1 p-4">
        <FilterSection title="Industry" sectionKey="industry">
          <div className="grid grid-cols-2 gap-1.5">
            {industries.map((industry) => (
              <FilterButton
                key={industry}
                selected={filters.industry.includes(industry)}
                onClick={() => {
                  const newIndustries = filters.industry.includes(industry)
                    ? filters.industry.filter((i) => i !== industry)
                    : [...filters.industry, industry];
                  handleFilterChange('industry', newIndustries);
                }}
              >
                {industry}
              </FilterButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Job Title" sectionKey="jobTitle">
          <div className="grid grid-cols-2 gap-1.5">
            {jobTitles.map((title) => (
              <FilterButton
                key={title}
                selected={filters.jobTitle.includes(title)}
                onClick={() => {
                  const newTitles = filters.jobTitle.includes(title)
                    ? filters.jobTitle.filter((t) => t !== title)
                    : [...filters.jobTitle, title];
                  handleFilterChange('jobTitle', newTitles);
                }}
              >
                {title}
              </FilterButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="List Type" sectionKey="listType">
          <div className="grid grid-cols-2 gap-1.5">
            {listTypes.map((type) => (
              <FilterButton
                key={type}
                selected={filters.listType.includes(type)}
                onClick={() => {
                  const newTypes = filters.listType.includes(type)
                    ? filters.listType.filter((t) => t !== type)
                    : [...filters.listType, type];
                  handleFilterChange('listType', newTypes);
                }}
              >
                {type}
              </FilterButton>
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
              onValueChange={(value) => handleFilterChange('priceRange', value as [number, number])}
              min={0}
              max={10000}
              step={100}
              className="w-full"
            />
          </div>
        </FilterSection>

        <FilterSection title="Quality Score" sectionKey="quality">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Minimum Score: {filters.qualityScore}%</span>
            </div>
            <Slider
              value={[filters.qualityScore]}
              onValueChange={(value) => handleFilterChange('qualityScore', value[0])}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
        </FilterSection>

        <FilterSection title="Location" sectionKey="location">
          <div className="grid grid-cols-2 gap-1.5">
            {locations.map((location) => (
              <FilterButton
                key={location}
                selected={filters.location.includes(location)}
                onClick={() => {
                  const newLocations = filters.location.includes(location)
                    ? filters.location.filter((l) => l !== location)
                    : [...filters.location, location];
                  handleFilterChange('location', newLocations);
                }}
              >
                {location}
              </FilterButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Company Size" sectionKey="company">
          <div className="grid grid-cols-2 gap-1.5">
            {companySizes.map((size) => (
              <FilterButton
                key={size}
                selected={filters.companySize.includes(size)}
                onClick={() => {
                  const newSizes = filters.companySize.includes(size)
                    ? filters.companySize.filter((s) => s !== size)
                    : [...filters.companySize, size];
                  handleFilterChange('companySize', newSizes);
                }}
              >
                {size}
              </FilterButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Seniority Level" sectionKey="seniority">
          <div className="grid grid-cols-2 gap-1.5">
            {seniorityLevels.map((level) => (
              <FilterButton
                key={level}
                selected={filters.seniority.includes(level)}
                onClick={() => {
                  const newLevels = filters.seniority.includes(level)
                    ? filters.seniority.filter((l) => l !== level)
                    : [...filters.seniority, level];
                  handleFilterChange('seniority', newLevels);
                }}
              >
                {level}
              </FilterButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Exclusivity Level" sectionKey="exclusivity">
          <div className="grid grid-cols-2 gap-1.5">
            {exclusivityLevels.map((level) => (
              <FilterButton
                key={level}
                selected={filters.exclusivityLevel.includes(level)}
                onClick={() => {
                  const newLevels = filters.exclusivityLevel.includes(level)
                    ? filters.exclusivityLevel.filter((l) => l !== level)
                    : [...filters.exclusivityLevel, level];
                  handleFilterChange('exclusivityLevel', newLevels);
                }}
              >
                {level}
              </FilterButton>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Data Freshness" sectionKey="freshness">
          <Select
            value={filters.freshness}
            onValueChange={(value) => handleFilterChange('freshness', value)}
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

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="verifiedSellers"
            checked={filters.verifiedSellers}
            onCheckedChange={(checked) => 
              handleFilterChange('verifiedSellers', checked as boolean)
            }
          />
          <label
            htmlFor="verifiedSellers"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Verified Sellers Only
          </label>
        </div>
      </CardContent>
    </Card>
  );
} 