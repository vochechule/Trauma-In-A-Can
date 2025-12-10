import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';
import type { Cache } from 'cache-manager';

@Controller('health')
export class HealthController {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get()
  async check() {
    let database = false;
    let cache = false;

    try {
      await this.dataSource.query('SELECT 1');
      database = true;
    } catch (error) {
      database = false;
      // eslint-disable-next-line no-console
      console.error('Database health check failed', error);
    }

    try {
      const cacheKey = 'health:pulse';
      await this.cacheManager.set(cacheKey, 'ok', 5);
      const cached = await this.cacheManager.get(cacheKey);
      cache = cached === 'ok';
    } catch (error) {
      cache = false;
      // eslint-disable-next-line no-console
      console.error('Cache health check failed', error);
    }

    return {
      status: database && cache ? 'ok' : 'degraded',
      checks: {
        database,
        cache,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
