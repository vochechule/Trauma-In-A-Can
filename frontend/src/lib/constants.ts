/**
 * Application constants
 */

export const APP_NAME = 'Trauma In A Can™';
export const APP_TAGLINE = 'Bottled Traumatic Experiences Since 2025';

/**
 * API Configuration
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Pagination
 */
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;

/**
 * Cache settings
 */
export const CACHE_REFRESH_INTERVAL = 5000; // 5 seconds

/**
 * Product categories (commonly used)
 */
export const PRODUCT_CATEGORIES = [
  'Medical Trauma',
  'Public Spaces',
  'Office Life',
  'Transportation',
  'Social Situations',
  'Childhood Memories',
  'Educational Trauma',
  'Service Industry',
] as const;

/**
 * Stock thresholds
 */
export const LOW_STOCK_THRESHOLD = 10;
export const OUT_OF_STOCK = 0;

/**
 * Price formatting
 */
export const CURRENCY = 'USD';
export const CURRENCY_SYMBOL = '$';

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  LOAD_PRODUCTS: 'Failed to load products',
  LOAD_PRODUCT: 'Failed to load product details',
  CREATE_PRODUCT: 'Failed to create product',
  UPDATE_PRODUCT: 'Failed to update product',
  DELETE_PRODUCT: 'Failed to delete product',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred',
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  CREATE_PRODUCT: 'Trauma successfully bottled! 🥫',
  UPDATE_PRODUCT: 'Trauma updated successfully',
  DELETE_PRODUCT: 'Trauma removed from inventory',
} as const;

/**
 * Sample trauma names for inspiration
 */
export const SAMPLE_TRAUMAS = [
  'Dental Office Waiting Room',
  'Public Restroom Experience',
  'DMV Queue Simulation',
  'Monday Morning Essence',
  'Traffic Jam Atmosphere',
  'Final Exam Pressure',
  'Job Interview Anxiety',
  'Awkward Elevator Ride',
  'Crowded Subway Car',
  'Forgotten Password Frustration',
] as const;

/**
 * Image placeholders
 */
export const PLACEHOLDER_IMAGE =
  'https://via.placeholder.com/300x300?text=Trauma+Can';
export const DEFAULT_CAN_EMOJI = '🥫';
