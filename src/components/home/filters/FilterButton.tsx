import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const FilterButton = ({ selected, onClick, children }: FilterButtonProps) => (
  <Button
    variant={selected ? "default" : "outline"}
    size="sm"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
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