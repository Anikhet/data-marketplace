import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  industry: string[];
  jobTitle: string[];
  volume: string;
  verifiedSellers: boolean;
  listType: string[];
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    industry: [],
    jobTitle: [],
    volume: 'any',
    verifiedSellers: false,
    listType: [],
  });

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
  ];

  const jobTitles = [
    'C-Level',
    'VP/Director',
    'Manager',
    'Individual Contributor',
  ];

  const listTypes = [
    'Email',
    'Phone',
    'LinkedIn',
    'Custom',
  ];

  const handleFilterChange = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Industry Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Industry</label>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={filters.industry.includes(industry) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const newIndustries = filters.industry.includes(industry)
                    ? filters.industry.filter((i) => i !== industry)
                    : [...filters.industry, industry];
                  handleFilterChange('industry', newIndustries);
                }}
              >
                {industry}
              </Button>
            ))}
          </div>
        </div>

        {/* Job Title Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Job Title</label>
          <div className="flex flex-wrap gap-2">
            {jobTitles.map((title) => (
              <Button
                key={title}
                variant={filters.jobTitle.includes(title) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const newTitles = filters.jobTitle.includes(title)
                    ? filters.jobTitle.filter((t) => t !== title)
                    : [...filters.jobTitle, title];
                  handleFilterChange('jobTitle', newTitles);
                }}
              >
                {title}
              </Button>
            ))}
          </div>
        </div>

        {/* Volume Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Volume</label>
          <Select
            value={filters.volume}
            onValueChange={(value) => handleFilterChange('volume', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select volume" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="0-1000">0-1,000</SelectItem>
              <SelectItem value="1000-5000">1,000-5,000</SelectItem>
              <SelectItem value="5000-10000">5,000-10,000</SelectItem>
              <SelectItem value="10000+">10,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Verified Sellers Filter */}
        <div className="flex items-center space-x-2">
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

        {/* List Type Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">List Type</label>
          <div className="flex flex-wrap gap-2">
            {listTypes.map((type) => (
              <Button
                key={type}
                variant={filters.listType.includes(type) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const newTypes = filters.listType.includes(type)
                    ? filters.listType.filter((t) => t !== type)
                    : [...filters.listType, type];
                  handleFilterChange('listType', newTypes);
                }}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 