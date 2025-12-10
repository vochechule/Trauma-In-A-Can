import { registerAs } from '@nestjs/config';

const toInt = (value: string | undefined, fallback: number) => {
  const parsed = parseInt(value ?? '', 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: toInt(process.env.REDIS_PORT, 6379),
  password: process.env.REDIS_PASSWORD || undefined,
  ttl: toInt(process.env.REDIS_TTL, 600),
}));
