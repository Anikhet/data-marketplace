import { Listing } from './types';

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Instantly LinkedIn Company Followers',
    description: 'Exclusive list of active LinkedIn company followers from high-growth tech companies. Perfect for targeted outreach and market expansion.',
    industry: 'Technology',
    jobTitle: 'Individual Contributor',
    volume: '1000-5000',
    type: 'LinkedIn',
    price: 50,
    isVerified: true,
    seller: {
      id: 'seller1',
      name: 'DataPro Solutions',
      rating: 4.8,
    },
    metadata: {
      niche: 'Technology',
      source: 'LinkedIn API',
      freshness: 'Updated Daily',
      exclusivityLevel: 'Premium'
    },
    stats: {
      rating: 4.8,
      lastSoldCount: 45,
      qualityScore: 92,
      totalCount: 1000,
      remainingCount: 5,
      lastUpdated: 'March 15, 2024'
    },
    previewRecords: [
      {
        name: 'John Smith',
        title: 'Growth Marketing Manager',
        company: 'TechStart Inc',
        email: 'john@techstart.com'
      }
    ]
  },
  {
    id: '2',
    title: 'Clay Slack Group Users',
    description: 'Curated list of active users from exclusive Clay Slack communities. High-intent professionals actively engaged in sales and marketing discussions.',
    industry: 'Technology',
    jobTitle: 'Individual Contributor',
    volume: '5000-10000',
    type: 'Email',
    price: 100,
    isVerified: true,
    seller: {
      id: 'seller2',
      name: 'MedData Inc',
      rating: 4.5,
    },
    metadata: {
      niche: 'Technology',
      source: 'Slack API',
      freshness: 'Updated Weekly',
      exclusivityLevel: 'Premium'
    },
    stats: {
      rating: 4.5,
      lastSoldCount: 78,
      qualityScore: 88,
      totalCount: 5000,
      remainingCount: 2,
      lastUpdated: 'March 10, 2024'
    },
    previewRecords: [
      {
        name: 'Sarah Johnson',
        title: 'Sales Operations Manager',
        company: 'Growth Co',
        email: 'sarah@growthco.com'
      }
    ]
  },
  {
    id: '3',
    title: 'DC Tech Week Startups 2025',
    description: 'Exclusive list of confirmed attendees and speakers from DC Tech Week 2025. Early access to decision-makers from the most promising startups.',
    industry: 'Technology',
    jobTitle: 'C-Level',
    volume: '10000+',
    type: 'Email',
    price: 40,
    isVerified: true,
    seller: {
      id: 'seller3',
      name: 'FinanceLeads',
      rating: 4.9,
    },
    metadata: {
      niche: 'Technology',
      source: 'Event Registration',
      freshness: 'Updated Daily',
      exclusivityLevel: 'Premium'
    },
    stats: {
      rating: 4.9,
      lastSoldCount: 120,
      qualityScore: 95,
      totalCount: 2000,
      remainingCount: 10,
      lastUpdated: 'March 20, 2024'
    },
    previewRecords: [
      {
        name: 'Michael Chen',
        title: 'Founder & CEO',
        company: 'AI Startup',
        email: 'mchen@aistartup.com'
      }
    ]
  },
  {
    id: '4',
    title: 'Smartlead Customers',
    description: 'Exclusive list of active Smartlead customers. High-value prospects already using email automation tools.',
    industry: 'Technology',
    jobTitle: 'VP/Director',
    volume: '0-1000',
    type: 'Email',
    price: 509,
    isVerified: true,
    seller: {
      id: 'seller4',
      name: 'RetailData Co',
      rating: 4.2,
    },
    metadata: {
      niche: 'Technology',
      source: 'Product Analytics',
      freshness: 'Updated Daily',
      exclusivityLevel: 'Premium'
    },
    stats: {
      rating: 4.2,
      lastSoldCount: 23,
      qualityScore: 85,
      totalCount: 800,
      remainingCount: 4,
      lastUpdated: 'March 1, 2024'
    },
    previewRecords: [
      {
        name: 'Lisa Brown',
        title: 'VP of Sales',
        company: 'SaaS Co',
        email: 'lisa@saasco.com'
      }
    ]
  },
  {
    id: '5',
    title: 'Slashdot Sales Tech Companies 2025',
    description: 'Curated list of companies featured in Slashdot\'s 2025 Sales Tech Report. Early access to decision-makers at innovative sales technology companies.',
    industry: 'Technology',
    jobTitle: 'C-Level',
    volume: '1000-5000',
    type: 'Email',
    price: 100,
    isVerified: true,
    seller: {
      id: 'seller5',
      name: 'IndustryLeads',
      rating: 4.6,
    },
    metadata: {
      niche: 'Technology',
      source: 'Industry Reports',
      freshness: 'Updated Weekly',
      exclusivityLevel: 'Premium'
    },
    stats: {
      rating: 4.6,
      lastSoldCount: 56,
      qualityScore: 90,
      totalCount: 3000,
      remainingCount: 15,
      lastUpdated: 'March 10, 2024'
    },
    previewRecords: [
      {
        name: 'David Wilson',
        title: 'CTO',
        company: 'SalesTech',
        email: 'dwilson@salestech.com'
      }
    ]
  },
  {
    id: '6',
    title: 'Stripe Companies 2025',
    description: 'Exclusive list of companies processing over $1M annually through Stripe. High-value prospects with proven payment processing needs.',
    industry: 'Technology',
    jobTitle: 'C-Level',
    volume: '5000-10000',
    type: 'Email',
    price: 200,
    isVerified: true,
    seller: {
      id: 'seller6',
      name: 'EduData Solutions',
      rating: 4.7,
    },
    metadata: {
      niche: 'Technology',
      source: 'Payment Processing',
      freshness: 'Updated Daily',
      exclusivityLevel: 'Premium'
    },
    stats: {
      rating: 4.7,
      lastSoldCount: 34,
      qualityScore: 89,
      totalCount: 4000,
      remainingCount: 1,
      lastUpdated: 'March 10, 2024'
    },
    previewRecords: [
      {
        name: 'Robert Taylor',
        title: 'CEO',
        company: 'FinTech Startup',
        email: 'rtaylor@fintech.com'
      }
    ]
  }
]; 