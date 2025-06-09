import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterBadgeProps {
  label: string;
  value: string;
  onRemove: () => void;
}

export const FilterBadge = ({ label, value, onRemove }: FilterBadgeProps) => (
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