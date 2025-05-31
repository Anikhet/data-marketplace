'use client';

import { useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
// import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Manufacturing',
  'Education',
  'Other',
];

const jobTitles = [
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'Marketing Manager',
  'Sales Representative',
  'Other',
];

const listTypes = ['Email', 'Phone', 'LinkedIn'];

export default function Filters() {
  const [isOpen, setIsOpen] = useState(true);
  const { filters, setFilters, applyFilters } = useFilters();

  const handleIndustryChange = (industry: string) => {
    const newFilters = {
      ...filters,
      industry: filters.industry.includes(industry)
        ? filters.industry.filter((i) => i !== industry)
        : [...filters.industry, industry],
    };
    setFilters(newFilters);
    applyFilters();
  };

  const handleJobTitleChange = (title: string) => {
    const newFilters = {
      ...filters,
      jobTitle: filters.jobTitle.includes(title)
        ? filters.jobTitle.filter((t) => t !== title)
        : [...filters.jobTitle, title],
    };
    setFilters(newFilters);
    applyFilters();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      volume: e.target.value,
    };
    setFilters(newFilters);
    applyFilters();
  };

  const handleVerifiedSellersChange = (checked: boolean) => {
    const newFilters = {
      ...filters,
      verifiedSellers: checked,
    };
    setFilters(newFilters);
    applyFilters();
  };

  const handleListTypeChange = (type: string) => {
    const newFilters = {
      ...filters,
      listType: filters.listType.includes(type)
        ? filters.listType.filter((t) => t !== type)
        : [...filters.listType, type],
    };
    setFilters(newFilters);
    applyFilters();
  };

  const clearFilters = () => {
    setFilters({
      industry: [],
      jobTitle: [],
      volume: '',
      verifiedSellers: false,
      listType: [],
    });
    applyFilters();
  };

  const getActiveFilterCount = () => {
    return (
      filters.industry.length +
      filters.jobTitle.length +
      (filters.volume ? 1 : 0) +
      (filters.verifiedSellers ? 1 : 0) +
      filters.listType.length
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isOpen ? 'Hide' : 'Show'} Filters
          </Button>
        </div>
        {getActiveFilterCount() > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {filters.industry.map((industry) => (
              <Badge
                key={industry}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {industry}
                <button
                  onClick={() => handleIndustryChange(industry)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {filters.jobTitle.map((title) => (
              <Badge
                key={title}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {title}
                <button
                  onClick={() => handleJobTitleChange(title)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {filters.volume && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
              >
                Volume: {filters.volume}
                <button
                  onClick={() => handleVolumeChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.verifiedSellers && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
              >
                Verified Sellers
                <button
                  onClick={() => handleVerifiedSellersChange(false)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.listType.map((type) => (
              <Badge
                key={type}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {type}
                <button
                  onClick={() => handleListTypeChange(type)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
      <div
        className={cn(
          'p-4 space-y-6 transition-all duration-200',
          isOpen ? 'block' : 'hidden'
        )}
      >
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Industry</h3>
          <div className="space-y-2">
            {industries.map((industry) => (
              <div key={industry} className="flex items-center">
                <Checkbox
                  id={`industry-${industry}`}
                  checked={filters.industry.includes(industry)}
                  onCheckedChange={() => handleIndustryChange(industry)}
                />
                <Label
                  htmlFor={`industry-${industry}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {industry}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Job Title</h3>
          <div className="space-y-2">
            {jobTitles.map((title) => (
              <div key={title} className="flex items-center">
                <Checkbox
                  id={`title-${title}`}
                  checked={filters.jobTitle.includes(title)}
                  onCheckedChange={() => handleJobTitleChange(title)}
                />
                <Label
                  htmlFor={`title-${title}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {title}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">List Volume</h3>
          <Input
            type="number"
            placeholder="Minimum number of contacts"
            value={filters.volume}
            onChange={handleVolumeChange}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center">
            <Checkbox
              id="verified-sellers"
              checked={filters.verifiedSellers}
              onCheckedChange={handleVerifiedSellersChange}
            />
            <Label
              htmlFor="verified-sellers"
              className="ml-2 text-sm text-gray-700"
            >
              Verified Sellers Only
            </Label>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">List Type</h3>
          <div className="space-y-2">
            {listTypes.map((type) => (
              <div key={type} className="flex items-center">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.listType.includes(type)}
                  onCheckedChange={() => handleListTypeChange(type)}
                />
                <Label
                  htmlFor={`type-${type}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 