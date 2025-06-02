import { Listing } from './types';

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Tech Startup CEOs',
    description: 'Comprehensive list of CEOs from Series A to C tech startups',
    industry: 'Technology',
    jobTitle: 'C-Level',
    volume: '1000-5000',
    type: 'Email',
    price: 2999,
    isVerified: true,
    seller: {
      id: 'seller1',
      name: 'DataPro Solutions',
      rating: 4.8,
    },
    metadata: {
      niche: 'Technology',
      source: 'Company Websites',
      freshness: 'Updated Weekly',
      exclusivityLevel: 'Premium'
    },
    stats: {
      rating: 4.8,
      lastSoldCount: 45,
      qualityScore: 92
    },
    previewRecords: [
      {
        name: 'John Smith',
        title: 'CEO',
        company: 'TechStart Inc',
        email: 'john@techstart.com'
      }
    ]
  },
  {
    id: '2',
    title: 'Healthcare Professionals',
    description: 'Database of healthcare professionals across major US hospitals',
    industry: 'Healthcare',
    jobTitle: 'Individual Contributor',
    volume: '5000-10000',
    type: 'Phone',
    price: 4999,
    isVerified: true,
    seller: {
      id: 'seller2',
      name: 'MedData Inc',
      rating: 4.5,
    },
    metadata: {
      niche: 'Healthcare',
      source: 'Medical Directories',
      freshness: 'Updated Monthly',
      exclusivityLevel: 'Standard'
    },
    stats: {
      rating: 4.5,
      lastSoldCount: 78,
      qualityScore: 88
    },
    previewRecords: [
      {
        name: 'Sarah Johnson',
        title: 'Nurse Practitioner',
        company: 'City Hospital',
        email: 'sarah@cityhospital.com'
      }
    ]
  },
  {
    id: '3',
    title: 'Finance Directors',
    description: 'List of finance directors from Fortune 500 companies',
    industry: 'Finance',
    jobTitle: 'VP/Director',
    volume: '10000+',
    type: 'LinkedIn',
    price: 7999,
    isVerified: true,
    seller: {
      id: 'seller3',
      name: 'FinanceLeads',
      rating: 4.9,
    },
    metadata: {
      niche: 'Finance',
      source: 'LinkedIn Premium',
      freshness: 'Updated Daily',
      exclusivityLevel: 'Premium'
    },
    stats: {
      rating: 4.9,
      lastSoldCount: 120,
      qualityScore: 95
    },
    previewRecords: [
      {
        name: 'Michael Chen',
        title: 'Finance Director',
        company: 'Fortune Corp',
        email: 'mchen@fortunecorp.com'
      }
    ]
  },
  {
    id: '4',
    title: 'Retail Managers',
    description: 'Database of retail store managers from top retail chains',
    industry: 'Retail',
    jobTitle: 'Manager',
    volume: '0-1000',
    type: 'Email',
    price: 1999,
    isVerified: false,
    seller: {
      id: 'seller4',
      name: 'RetailData Co',
      rating: 4.2,
    },
    metadata: {
      niche: 'Retail',
      source: 'Store Directories',
      freshness: 'Updated Quarterly',
      exclusivityLevel: 'Basic'
    },
    stats: {
      rating: 4.2,
      lastSoldCount: 23,
      qualityScore: 85
    },
    previewRecords: [
      {
        name: 'Lisa Brown',
        title: 'Store Manager',
        company: 'Retail Chain',
        email: 'lisa@retailchain.com'
      }
    ]
  },
  {
    id: '5',
    title: 'Manufacturing Engineers',
    description: 'List of manufacturing engineers from automotive industry',
    industry: 'Manufacturing',
    jobTitle: 'Individual Contributor',
    volume: '1000-5000',
    type: 'Phone',
    price: 3499,
    isVerified: true,
    seller: {
      id: 'seller5',
      name: 'IndustryLeads',
      rating: 4.6,
    },
    metadata: {
      niche: 'Manufacturing',
      source: 'Industry Directories',
      freshness: 'Updated Monthly',
      exclusivityLevel: 'Standard'
    },
    stats: {
      rating: 4.6,
      lastSoldCount: 56,
      qualityScore: 90
    },
    previewRecords: [
      {
        name: 'David Wilson',
        title: 'Senior Engineer',
        company: 'AutoTech',
        email: 'dwilson@autotech.com'
      }
    ]
  },
  {
    id: '6',
    title: 'Education Administrators',
    description: 'Database of school and university administrators',
    industry: 'Education',
    jobTitle: 'Manager',
    volume: '5000-10000',
    type: 'Email',
    price: 2499,
    isVerified: true,
    seller: {
      id: 'seller6',
      name: 'EduData Solutions',
      rating: 4.7,
    },
    metadata: {
      niche: 'Education',
      source: 'School Directories',
      freshness: 'Updated Monthly',
      exclusivityLevel: 'Standard'
    },
    stats: {
      rating: 4.7,
      lastSoldCount: 34,
      qualityScore: 89
    },
    previewRecords: [
      {
        name: 'Robert Taylor',
        title: 'School Principal',
        company: 'City High School',
        email: 'rtaylor@cityhigh.edu'
      }
    ]
  }
]; 