/**
 * Mock data for testing and development
 * Use this when backend is not available
 */

import { Product, ProductWithCache, CacheStats } from '@/types/product';

export const mockProducts: ProductWithCache[] = [
  {
    id: 1,
    name: 'Dental Office Waiting Room',
    description: 'Experience the anxiety of waiting for your dentist appointment. Includes subtle drill sounds and that distinctive antiseptic smell.',
    price: 99.99,
    category: 'Medical Trauma',
    stock_quantity: 15,
    image_url: 'https://via.placeholder.com/300x300?text=Dental+Office',
    created_at: '2025-12-05T10:00:00Z',
    updated_at: '2025-12-05T10:00:00Z',
    cacheHit: false,
  },
  {
    id: 2,
    name: 'Public Restroom Experience',
    description: 'The ultimate uncomfortable public restroom encounter. Complete with broken lock anxiety and questionable cleanliness.',
    price: 79.99,
    category: 'Public Spaces',
    stock_quantity: 8,
    image_url: 'https://via.placeholder.com/300x300?text=Public+Restroom',
    created_at: '2025-12-05T09:30:00Z',
    updated_at: '2025-12-05T09:30:00Z',
    cacheHit: true,
  },
  {
    id: 3,
    name: 'DMV Queue Simulation',
    description: 'Relive the joy of waiting in line at the DMV. Now with authentic bureaucratic inefficiency and paper form confusion.',
    price: 89.99,
    category: 'Public Spaces',
    stock_quantity: 0,
    image_url: 'https://via.placeholder.com/300x300?text=DMV+Queue',
    created_at: '2025-12-05T09:00:00Z',
    updated_at: '2025-12-05T09:00:00Z',
    cacheHit: false,
  },
  {
    id: 4,
    name: 'Monday Morning Essence',
    description: 'Pure distilled essence of Monday morning dread. Best consumed before coffee.',
    price: 69.99,
    category: 'Office Life',
    stock_quantity: 42,
    image_url: 'https://via.placeholder.com/300x300?text=Monday+Morning',
    created_at: '2025-12-05T08:30:00Z',
    updated_at: '2025-12-05T08:30:00Z',
    cacheHit: true,
  },
  {
    id: 5,
    name: 'Traffic Jam Atmosphere',
    description: 'That special feeling of being stuck in traffic when you\'re already late. Includes horn honking and exhaust fumes.',
    price: 74.99,
    category: 'Transportation',
    stock_quantity: 23,
    image_url: 'https://via.placeholder.com/300x300?text=Traffic+Jam',
    created_at: '2025-12-05T08:00:00Z',
    updated_at: '2025-12-05T08:00:00Z',
    cacheHit: false,
  },
  {
    id: 6,
    name: 'Final Exam Pressure',
    description: 'The panic of realizing you didn\'t study enough. Features blank mind syndrome and clock-ticking anxiety.',
    price: 94.99,
    category: 'Educational Trauma',
    stock_quantity: 12,
    image_url: 'https://via.placeholder.com/300x300?text=Final+Exam',
    created_at: '2025-12-05T07:30:00Z',
    updated_at: '2025-12-05T07:30:00Z',
    cacheHit: true,
  },
  {
    id: 7,
    name: 'Job Interview Anxiety',
    description: 'Sweaty palms and awkward small talk, all in one convenient package. "Tell me about yourself" not included.',
    price: 109.99,
    category: 'Office Life',
    stock_quantity: 6,
    image_url: 'https://via.placeholder.com/300x300?text=Job+Interview',
    created_at: '2025-12-05T07:00:00Z',
    updated_at: '2025-12-05T07:00:00Z',
    cacheHit: false,
  },
  {
    id: 8,
    name: 'Awkward Elevator Ride',
    description: 'Trapped in a small space with strangers. Where do you look? What do you do with your hands?',
    price: 59.99,
    category: 'Social Situations',
    stock_quantity: 31,
    image_url: 'https://via.placeholder.com/300x300?text=Elevator',
    created_at: '2025-12-05T06:30:00Z',
    updated_at: '2025-12-05T06:30:00Z',
    cacheHit: true,
  },
];

export const mockCacheStats: CacheStats = {
  hits: 156,
  misses: 44,
  hitRate: 78.0,
};

export const mockCategories: string[] = [
  'Medical Trauma',
  'Public Spaces',
  'Office Life',
  'Transportation',
  'Educational Trauma',
  'Social Situations',
  'Childhood Memories',
  'Service Industry',
];

/**
 * Get random products for testing
 */
export const getRandomProducts = (count: number = 4): ProductWithCache[] => {
  const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Get product by ID
 */
export const getMockProductById = (id: number): ProductWithCache | undefined => {
  return mockProducts.find((p) => p.id === id);
};

/**
 * Simulate cache hit/miss
 */
export const withRandomCacheStatus = (product: ProductWithCache): ProductWithCache => {
  return {
    ...product,
    cacheHit: Math.random() > 0.3, // 70% cache hit rate
  };
};
