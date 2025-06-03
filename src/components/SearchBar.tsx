import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
  <Input
  type="text"
  value={query}
  onChange={handleChange}
  placeholder="Search for data lists (e.g., 'tech companies', 'healthcare professionals')"
  className="pl-10 pr-10 h-14 rounded-lg border-2 border-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base shadow-sm transition-all"
/>

        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </Button>
        )}
      </div>
    </div>
  );
} 