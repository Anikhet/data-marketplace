import { FileList } from '@/components/datasets/FileList';

export default function DatasetsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">All Datasets</h1>
          <p className="mt-2 text-sm text-gray-600">
            View all uploaded CSV files from the dataset bucket
          </p>
        </div>
        <FileList />
      </div> 
    </div> 
  );
} 