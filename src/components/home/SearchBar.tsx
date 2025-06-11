import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  X,
  ChevronRight,
  Search,
  Bot,
  Activity,
  BarChart2,
} from "lucide-react";
import LaunchUI from "../ui/logos/launch-ui";
import { useListingsContext } from "@/contexts/listings-context";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

interface Suggestion {
  id: string;
  title: string;
  industry: string;
  type: string;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { listings } = useListingsContext();

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(/\s+/);
    const filtered = listings
      .filter((listing) => {
        const searchableText = [
          listing.title,
          listing.industry,
          listing.type,
          listing.description,
        ]
          .map((text) => String(text).toLowerCase())
          .join(" ");
        return searchTerms.every((term) => searchableText.includes(term));
      })
      .map((listing) => ({
        id: listing.id,
        title: listing.title,
        industry: listing.industry,
        type: listing.type,
      }))
      .slice(0, 5);

    setSuggestions(filtered);
    setShowSuggestions(true);
  }, [query, listings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex > -1) {
          const selected = suggestions[selectedIndex];
          setQuery(selected.title);
          onSearch(selected.title);
          setShowSuggestions(false);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.title);
    onSearch(suggestion.title);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSuggestionsPosition = () => {
    if (!containerRef.current) return { top: 0, left: 0, width: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    };
  };


  return (
    <div className="relative max-w-3xl mx-auto" ref={containerRef}>
      {/* Input with border */}
      <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-400 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-20">
            <LaunchUI />
          </div>
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.trim() && setShowSuggestions(true)}
            placeholder="Search for data lists (e.g., 'tech companies', 'healthcare professionals')"
            className="pl-16 pr-14 h-16 text-lg rounded-xl bg-white/95 backdrop-blur-lg border-orange-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500 focus-visible:border-orange-500 w-full placeholder:text-muted-foreground relative z-10"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center p-0 h-6 w-6 z-20 hover:bg-orange-100 rounded-full"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>

      {/* Smart Suggestions Grid */}

<div className="z-10 relative mt-10 space-y-6 px-4">
  {/* Top Layer */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
    {/* Suggestion 1 */}
    <div className="flex justify-center">
      <button
        onClick={() => {
          setQuery("Tech companies that are likely raising soon");
          onSearch("Tech companies that are likely raising soon");
          setSelectedIndex(-1);
          setShowSuggestions(true);
          inputRef.current?.focus();
        }}
        className="flex items-center gap-2 w-full max-w-md px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-all shadow-sm"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-100">
          <Search className="w-4 h-4 text-gray-700" />
        </div>
        <span className="text-sm font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
          Tech companies that are likely raising soon
        </span>
      </button>
    </div>

    {/* Suggestion 2 */}
    <div className="flex justify-center">
      <button
        onClick={() => {
          setQuery("Robotics companies that might get acquired");
          onSearch("Robotics companies that might get acquired");
          setSelectedIndex(-1);
          setShowSuggestions(true);
          inputRef.current?.focus();
        }}
        className="flex items-center gap-2 w-full max-w-md px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-all shadow-sm"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-orange-100">
          <Bot className="w-4 h-4 text-gray-700" />
        </div>
        <span className="text-sm font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
          Robotics companies that might get acquired
        </span>
      </button>
    </div>
  </div>

  {/* Bottom Layer */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
    {/* Suggestion 3 */}
    <div className="flex justify-center">
      <button
        onClick={() => {
          setQuery("Chart the funding journey of xAI");
          onSearch("Chart the funding journey of xAI");
          setSelectedIndex(-1);
          setShowSuggestions(true);
          inputRef.current?.focus();
        }}
        className="flex items-center gap-2 w-full max-w-md px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-all shadow-sm"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-pink-100">
          <Activity className="w-4 h-4 text-gray-700" />
        </div>
        <span className="text-sm font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
          Chart the funding journey of xAI
        </span>
      </button>
    </div>

    {/* Suggestion 4 */}
    <div className="flex justify-center">
      <button
        onClick={() => {
          setQuery("Healthcare startups using LLMs");
          onSearch("Healthcare startups using LLMs");
          setSelectedIndex(-1);
          setShowSuggestions(true);
          inputRef.current?.focus();
        }}
        className="flex items-center gap-2 w-full max-w-md px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-all shadow-sm"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100">
          <BarChart2 className="w-4 h-4 text-gray-700" />
        </div>
        <span className="text-sm font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
          Healthcare startups using LLMs


        </span>
      </button>
    </div>
  </div>
</div>




      {/* Suggestions Dropdown */}
      {showSuggestions &&
        suggestions.length > 0 &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            ref={suggestionsRef}
            style={{
              position: "absolute",
              top: `${getSuggestionsPosition().top}px`,
              left: `${getSuggestionsPosition().left}px`,
              width: `${getSuggestionsPosition().width}px`,
              zIndex: 9999,
            }}
            className="mt-2 bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  "w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors duration-150 flex items-center justify-between",
                  index === selectedIndex && "bg-orange-50"
                )}
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {suggestion.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {suggestion.industry} • {suggestion.type}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
