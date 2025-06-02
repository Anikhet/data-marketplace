// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { ListingPreview } from '../ListingPreview';
// import { toast } from 'sonner';

// // Mock the toast notifications
// jest.mock('sonner', () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));

// // Mock fetch
// global.fetch = jest.fn();

// const mockListing = {
//   id: '1',
//   title: 'Test Listing',
//   description: 'Test Description',
//   industry: 'Technology',
//   jobTitle: 'Software Engineer',
//   volume: '1000',
//   type: 'Email',
//   seller: {
//     name: 'Test Seller',
//     isVerified: true,
//   },
//   metadata: {
//     niche: 'Tech',
//     source: 'LinkedIn',
//     freshness: '1 month',
//     exclusivityLevel: 'High',
//   },
//   stats: {
//     rating: 4.5,
//     lastSoldCount: 10,
//     qualityScore: 85,
//   },
//   previewRecords: [
//     {
//       name: 'John Doe',
//       title: 'Software Engineer',
//       company: 'Tech Corp',
//       email: 'john@example.com',
//     },
//   ],
// };

// describe('ListingPreview', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders listing details correctly', () => {
//     render(<ListingPreview listing={mockListing} />);
    
//     expect(screen.getByText('Test Listing')).toBeInTheDocument();
//     expect(screen.getByText('Test Description')).toBeInTheDocument();
//     expect(screen.getByText('Tech')).toBeInTheDocument();
//     expect(screen.getByText('LinkedIn')).toBeInTheDocument();
//     expect(screen.getByText('1 month')).toBeInTheDocument();
//     expect(screen.getByText('High')).toBeInTheDocument();
//   });

//   it('handles successful list request', async () => {
//     (global.fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       statusText: 'OK',
//     });

//     render(<ListingPreview listing={mockListing} />);
    
//     const requestButton = screen.getByText('Request This List');
//     fireEvent.click(requestButton);

//     await waitFor(() => {
//       expect(global.fetch).toHaveBeenCalledWith(
//         '/api/listings/1/request',
//         expect.objectContaining({
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })
//       );
//       expect(toast.success).toHaveBeenCalledWith('List requested successfully');
//     });
//   });

//   it('handles failed list request', async () => {
//     (global.fetch as jest.Mock).mockResolvedValueOnce({
//       ok: false,
//       statusText: 'Bad Request',
//     });

//     render(<ListingPreview listing={mockListing} />);
    
//     const requestButton = screen.getByText('Request This List');
//     fireEvent.click(requestButton);

//     await waitFor(() => {
//       expect(toast.error).toHaveBeenCalledWith('Failed to request list: Bad Request');
//     });
//   });

//   it('masks email addresses in preview records', () => {
//     render(<ListingPreview listing={mockListing} />);
    
//     const maskedEmail = screen.getByText('joh***@example.com');
//     expect(maskedEmail).toBeInTheDocument();
//   });
// }); 