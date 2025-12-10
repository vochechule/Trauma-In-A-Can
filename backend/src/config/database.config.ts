import { registerAs } from '@nestjs/config';

const toInt = (value: string | undefined, fallback: number) => {
  const parsed = parseInt(value ?? '', 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const toBool = (value: string | undefined, fallback = false) => {
  if (typeof value === 'undefined') return fallback;
  return ['true', '1', 'yes', 'y'].includes(value.toLowerCase());
};

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: toInt(process.env.DATABASE_PORT, 5432),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  name: process.env.DATABASE_NAME || 'product_catalog',
  synchronize: toBool(process.env.DATABASE_SYNCHRONIZE, false),
}));
