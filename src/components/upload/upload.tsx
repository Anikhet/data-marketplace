'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function UploadPage() {
  const router = useRouter();
  const supabase = createClient();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log('Authenticated user:', user);
      if (!user) {
        throw new Error('User not authenticated');
      }

      const file = acceptedFiles[0];
      if (!file) return;

      // Generate a unique ID for the listing
      const listingId = uuidv4();
      
      // Create a unique filename
      const fileExtension = file.name.split('.').pop();
      const fileName = `${listingId}.${fileExtension}`;
      
// Upload file to Supabase Storage
const { error: uploadError } = await supabase.storage
  .from('dataset-bucket')
  .upload(`${user.id}/${fileName}`, file, {
    contentType: 'text/csv',
    upsert: true,
  });



if (uploadError) {
  console.error('Upload error details:', {
    uploadError,
    filePath: `${user.id}/${fileName}`,
    bucket: 'dataset-bucket',
    fileType: file.type,
    fileSize: file.size,
  });

  throw new Error(uploadError?.message || 'Upload failed');
}



      // Create listing entry in the database
      const { error: dbError } = await supabase
        .from('listings')
        .insert({
          id: listingId,
          title: file.name,
          description: 'Uploaded dataset',
          seller_id: user.id,
          status: 'published',
          price_cents: 0,
          is_request_only: false,
          data_source: ['user_upload'],
          exclusivity_level: 'standard',
          max_sales: 100,
          current_sales: 0,
          quality_score: 0,
          bounce_rate: 0,
          verification_status: false,
          tags: ['csv'],
          preview_data_path: `${user.id}/${fileName}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

if (dbError) {
  console.error('Database insert error:', dbError);
  throw new Error(dbError.message);
}

      router.push('dashboard/datasets');
    } catch (error: Error | unknown) {
      console.error('Error uploading file:', error instanceof Error ? error.message : error);
    }
  }, [router, supabase]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Upload Dataset</h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload your CSV dataset to the marketplace
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`mt-8 border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-gray-600">
              {isDragActive ? (
                <p>Drop the CSV file here ...</p>
              ) : (
                <p>
                  Drag and drop your CSV file here, or{' '}
                  <span className="text-blue-500">click to select</span>
                </p>
              )}
            </div>
            <p className="text-xs text-gray-500">Only CSV files are supported</p>
          </div>
        </div>
      </div>
    </div>
  );
} 