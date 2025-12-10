/**
 * Mock data for testing and development
 * Use this when backend is not available
 */

import { ProductWithCache } from '@/types/product';

export const mockProducts: ProductWithCache[] = [
  {
    id: 1,
    name: 'Dental Office Waiting Room',
    description: 'Experience the anxiety of waiting for your dentist appointment. Includes subtle drill sounds and that distinctive antiseptic smell.',
    price: 99.99,
    category: 'Medical Trauma',
    stockQuantity: 15,
    imageUrl: 'https://via.placeholder.com/300x300?text=Dental+Office',
    createdAt: '2025-12-05T10:00:00Z',
    updatedAt: '2025-12-05T10:00:00Z',
    cacheHit: false,
  },
  {
    id: 2,
    name: 'Public Restroom Experience',
    description: 'The ultimate uncomfortable public restroom encounter. Complete with broken lock anxiety and questionable cleanliness.',
    price: 79.99,
    category: 'Public Spaces',
    stockQuantity: 8,
    imageUrl: 'https://via.placeholder.com/300x300?text=Public+Restroom',
    createdAt: '2025-12-05T09:30:00Z',
    updatedAt: '2025-12-05T09:30:00Z',
    cacheHit: true,
  },
  {
    id: 3,
    name: 'DMV Queue Simulation',
    description: 'Relive the joy of waiting in line at the DMV. Now with authentic bureaucratic inefficiency and paper form confusion.',
    price: 89.99,
    category: 'Public Spaces',
    stockQuantity: 0,
    imageUrl: 'https://via.placeholder.com/300x300?text=DMV+Queue',
    createdAt: '2025-12-05T09:00:00Z',
    updatedAt: '2025-12-05T09:00:00Z',
    cacheHit: false,
  },
  {
    id: 4,
    name: 'Monday Morning Essence',
    description: 'Pure distilled essence of Monday morning dread. Best consumed before coffee.',
    price: 69.99,
    category: 'Office Life',
    stockQuantity: 42,
    imageUrl: 'https://via.placeholder.com/300x300?text=Monday+Morning',
    createdAt: '2025-12-05T08:30:00Z',
    updatedAt: '2025-12-05T08:30:00Z',
    cacheHit: true,
  },
  {
    id: 5,
    name: 'Traffic Jam Atmosphere',
    description: "That special feeling of being stuck in traffic when you're already late. Includes horn honking and exhaust fumes.",
    price: 74.99,
    category: 'Transportation',
    stockQuantity: 23,
    imageUrl: 'https://via.placeholder.com/300x300?text=Traffic+Jam',
    createdAt: '2025-12-05T08:00:00Z',
    updatedAt: '2025-12-05T08:00:00Z',
    cacheHit: false,
  },
  {
    id: 6,
    name: 'Final Exam Pressure',
    description: "The panic of realizing you didn't study enough. Features blank mind syndrome and clock-ticking anxiety.",
    price: 94.99,
    category: 'Educational Trauma',
    stockQuantity: 12,
    imageUrl: 'https://via.placeholder.com/300x300?text=Final+Exam',
    createdAt: '2025-12-05T07:30:00Z',
    updatedAt: '2025-12-05T07:30:00Z',
    cacheHit: true,
  },
  {
    id: 7,
    name: 'Job Interview Anxiety',
    description: 'Sweaty palms and awkward small talk, all in one convenient package. "Tell me about yourself" not included.',
    price: 109.99,
    category: 'Office Life',
    stockQuantity: 6,
    imageUrl: 'https://via.placeholder.com/300x300?text=Job+Interview',
    createdAt: '2025-12-05T07:00:00Z',
    updatedAt: '2025-12-05T07:00:00Z',
    cacheHit: false,
  },
  {
    id: 8,
    name: 'Awkward Elevator Ride',
    description: 'Trapped in a small space with strangers. Where do you look? What do you do with your hands?',
    price: 59.99,
    category: 'Social Situations',
    stockQuantity: 31,
    imageUrl: 'https://via.placeholder.com/300x300?text=Elevator',
    createdAt: '2025-12-05T06:30:00Z',
    updatedAt: '2025-12-05T06:30:00Z',
    cacheHit: true,
  },
];

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
