import { FilterSection } from './FilterSection';
import { FilterButton } from './FilterButton';

interface FilterGroupProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onOptionChange: (option: string) => void;
  sectionKey: string;
  isExpanded: boolean;
  onToggle: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeCount: number;
}

export const FilterGroup = ({
  title,
  options,
  selectedOptions,
  onOptionChange,
  sectionKey,
  isExpanded,
  onToggle,
  searchTerm,
  onSearchChange,
  activeCount
}: FilterGroupProps) => {
  const filteredOptions = searchTerm
    ? options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  return (
    <FilterSection
      title={title}
      sectionKey={sectionKey}
      options={options}
      isExpanded={isExpanded}
      onToggle={onToggle}
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      activeCount={activeCount}
    >
      <div className="grid grid-cols-2 gap-1.5">
        {filteredOptions.map((option) => (
          <FilterButton
            key={option}
            selected={selectedOptions.includes(option)}
            onClick={() => onOptionChange(option)}
          >
            {option}
          </FilterButton>
        ))}
      </div>
    </FilterSection>
  );
}; 