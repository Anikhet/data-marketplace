'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type FileItem = {
  name: string;
  fullPath: string;
  userId: string;
  size: number;
  updated_at: string;
};

export function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const loadFiles = async () => {
      try {
        console.log('Attempting to list files from folder: 2da49fe4-8531-45da-a53d-dd758b205e38');
        
        // First verify bucket access
        const { data: bucketData, error: bucketError } = await supabase
          .storage
          .getBucket('dataset-bucket');

        if (bucketError) {
          console.error('Error accessing bucket:', bucketError);
          throw bucketError;
        }

        console.log('Bucket access successful:', bucketData);

        // List files from specific folder
        const { data: files, error: filesError } = await supabase
          .storage
          .from('dataset-bucket')
          .list('2da49fe4-8531-45da-a53d-dd758b205e38', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (filesError) {
          console.error('Error listing files:', filesError);
          throw filesError;
        }

        console.log('Files response:', files);

        if (!files || files.length === 0) {
          console.log('No files found in folder');
          setFiles([]);
          return;
        }

        const fileItems = files.map((f) => ({
          name: f.name,
          fullPath: `2da49fe4-8531-45da-a53d-dd758b205e38/${f.name}`,
          userId: '2da49fe4-8531-45da-a53d-dd758b205e38',
          size: f.metadata?.size || 0,
          updated_at: f.updated_at || new Date().toISOString(),
        }));

        console.log('Processed file items:', fileItems);
        setFiles(fileItems);
      } catch (err) {
        console.error('Error in loadFiles:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [supabase.storage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No files found in the dataset bucket.</p>
        <p className="text-sm text-gray-400 mt-2">Please check the browser console for more details.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.map((file) => (
              <tr key={file.fullPath}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {file.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(file.updated_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
