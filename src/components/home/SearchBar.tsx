import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { X } from 'lucide-react';
import LaunchUI from '../ui/logos/launch-ui';

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
<div className="relative w-full max-w-4xl mx-auto">
  {/* Input with fat border and gradient edge */}
  <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-400 shadow-md">
    <div className="relative">
      {/* LaunchUI on the left inside input */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-10">
        <LaunchUI />
      </div>

      {/* Input field with padding to avoid overlap */}
<Input
  type="text"
  value={query}
  onChange={handleChange}
  placeholder="Search for data lists (e.g., 'tech companies', 'healthcare professionals')"
  className="pl-16 pr-14 h-16 text-base rounded-xl bg-white/90 backdrop-blur-lg  border-orange-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500 focus-visible:border-orange-500 w-full placeholder:text-muted-foreground"
/>

      {/* Clear Button on the right */}
      {query && (
 <Button
  type="button"
  variant="ghost"
  size="icon"
  onClick={handleClear}
  className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center p-0 h-6 w-6 z-10"
>
  <X className="h-5 w-5 text-muted-foreground" />
</Button>

      )}
    </div>
  </div>
</div>



  );
}
