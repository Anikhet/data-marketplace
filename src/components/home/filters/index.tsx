import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterBadge } from './FilterBadge';
import { FilterGroup } from './FilterGroup';

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

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

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

  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({
    industry: '',
    jobTitle: '',
    listType: '',
    location: '',
    companySize: '',
    seniority: '',
    exclusivityLevel: ''
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail',
    'Education', 'Real Estate', 'Media & Entertainment', 'Energy',
    'Transportation', 'Agriculture', 'Construction', 'Hospitality',
    'Professional Services', 'Non-Profit'
  ];

  const jobTitles = [
    'C-Level', 'VP/Director', 'Manager', 'Individual Contributor',
    'Founder', 'Owner', 'President', 'Chief Officer',
    'Head of Department', 'Team Lead', 'Senior',
    'Mid-Level', 'Entry Level'
  ];

  const listTypes = [
    'Email', 'Phone', 'LinkedIn', 'Custom',
    'Social Media', 'Company', 'Address'
  ];

  const locations = [
    'North America', 'Europe', 'Asia Pacific', 'Latin America',
    'Middle East', 'Africa', 'United States', 'United Kingdom',
    'Canada', 'Australia', 'Germany', 'France',
    'Japan', 'India', 'China'
  ];

  const companySizes = [
    '1-10', '11-50', '51-200', '201-500',
    '501-1000', '1001-5000', '5001-10000', '10000+'
  ];

  const seniorityLevels = [
    'C-Suite', 'Executive', 'Senior Management',
    'Middle Management', 'Individual Contributor', 'Entry Level'
  ];

  const exclusivityLevels = [
    'Premium', 'Standard', 'Basic', 'Exclusive', 'Custom'
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

  const handleSearchChange = (section: string, value: string) => {
    setSearchTerms(prev => ({
      ...prev,
      [section]: value.toLowerCase()
    }));
  };

  const getActiveFilterCount = (section: string) => {
    switch (section) {
      case 'industry': return filters.industry.length;
      case 'jobTitle': return filters.jobTitle.length;
      case 'listType': return filters.listType.length;
      case 'location': return filters.location.length;
      case 'company': return filters.companySize.length;
      case 'seniority': return filters.seniority.length;
      case 'exclusivity': return filters.exclusivityLevel.length;
      case 'freshness': return filters.freshness !== 'any' ? 1 : 0;
      case 'quality': return filters.qualityScore > 0 ? 1 : 0;
      case 'price': return filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0;
      default: return 0;
    }
  };

  const handleOptionChange = (section: keyof FilterState, option: string) => {
    const currentOptions = filters[section] as string[];
    const newOptions = currentOptions.includes(option)
      ? currentOptions.filter(item => item !== option)
      : [...currentOptions, option];
    handleFilterChange(section, newOptions);
  };

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
        </div>
      </CardHeader>
      <CardContent className="space-y-2 overflow-y-auto flex-1 p-4">
        <FilterGroup
          title="Industry"
          options={industries}
          selectedOptions={filters.industry}
          onOptionChange={(option) => handleOptionChange('industry', option)}
          sectionKey="industry"
          isExpanded={expandedSections.industry}
          onToggle={() => toggleSection('industry')}
          searchTerm={searchTerms.industry}
          onSearchChange={(value) => handleSearchChange('industry', value)}
          activeCount={getActiveFilterCount('industry')}
        />

        <FilterGroup
          title="Job Title"
          options={jobTitles}
          selectedOptions={filters.jobTitle}
          onOptionChange={(option) => handleOptionChange('jobTitle', option)}
          sectionKey="jobTitle"
          isExpanded={expandedSections.jobTitle}
          onToggle={() => toggleSection('jobTitle')}
          searchTerm={searchTerms.jobTitle}
          onSearchChange={(value) => handleSearchChange('jobTitle', value)}
          activeCount={getActiveFilterCount('jobTitle')}
        />

        <FilterGroup
          title="List Type"
          options={listTypes}
          selectedOptions={filters.listType}
          onOptionChange={(option) => handleOptionChange('listType', option)}
          sectionKey="listType"
          isExpanded={expandedSections.listType}
          onToggle={() => toggleSection('listType')}
          searchTerm={searchTerms.listType}
          onSearchChange={(value) => handleSearchChange('listType', value)}
          activeCount={getActiveFilterCount('listType')}
        />

        <FilterGroup
          title="Location"
          options={locations}
          selectedOptions={filters.location}
          onOptionChange={(option) => handleOptionChange('location', option)}
          sectionKey="location"
          isExpanded={expandedSections.location}
          onToggle={() => toggleSection('location')}
          searchTerm={searchTerms.location}
          onSearchChange={(value) => handleSearchChange('location', value)}
          activeCount={getActiveFilterCount('location')}
        />

        <FilterGroup
          title="Company Size"
          options={companySizes}
          selectedOptions={filters.companySize}
          onOptionChange={(option) => handleOptionChange('companySize', option)}
          sectionKey="companySize"
          isExpanded={expandedSections.company}
          onToggle={() => toggleSection('company')}
          searchTerm={searchTerms.companySize}
          onSearchChange={(value) => handleSearchChange('companySize', value)}
          activeCount={getActiveFilterCount('company')}
        />

        <FilterGroup
          title="Seniority Level"
          options={seniorityLevels}
          selectedOptions={filters.seniority}
          onOptionChange={(option) => handleOptionChange('seniority', option)}
          sectionKey="seniority"
          isExpanded={expandedSections.seniority}
          onToggle={() => toggleSection('seniority')}
          searchTerm={searchTerms.seniority}
          onSearchChange={(value) => handleSearchChange('seniority', value)}
          activeCount={getActiveFilterCount('seniority')}
        />

        <FilterGroup
          title="Exclusivity Level"
          options={exclusivityLevels}
          selectedOptions={filters.exclusivityLevel}
          onOptionChange={(option) => handleOptionChange('exclusivityLevel', option)}
          sectionKey="exclusivityLevel"
          isExpanded={expandedSections.exclusivity}
          onToggle={() => toggleSection('exclusivity')}
          searchTerm={searchTerms.exclusivityLevel}
          onSearchChange={(value) => handleSearchChange('exclusivityLevel', value)}
          activeCount={getActiveFilterCount('exclusivity')}
        />

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