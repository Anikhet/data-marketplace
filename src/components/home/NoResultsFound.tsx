import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchX } from "lucide-react";

export default function NoResultsFound() {
  return (
    <Card className="p-8 text-center bg-white/50 backdrop-blur-sm border-orange-100">
      <div className="flex flex-col items-center gap-4">
        <SearchX className="h-12 w-12 text-orange-500" />
        <h3 className="text-xl font-semibold text-gray-900">No Results Found</h3>
        <p className="text-gray-500 max-w-md">
          We couldn&apos;t find any lists matching your criteria. Let us create a custom list tailored to your specific needs.
        </p>
        <Button 
          className="mt-2 bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => window.location.href = '/request-custom-list'}
        >
          Request Custom List
        </Button>
      </div>
    </Card>
  );
} 