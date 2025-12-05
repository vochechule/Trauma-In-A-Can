'use client';

import { useState, useEffect } from 'react';
import { CacheStats } from '@/types/product';
import { api } from '@/lib/api';

export default function CacheIndicator() {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.getCacheStats();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load cache stats:', error);
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return null;
  }

  const hitRateColor =
    stats.hitRate >= 70 ? 'text-green-400' : stats.hitRate >= 40 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-300 flex items-center">
          <span className="mr-2">⚡</span> Cache Performance
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{stats.hits}</div>
          <div className="text-xs text-gray-500">Hits</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{stats.misses}</div>
          <div className="text-xs text-gray-500">Misses</div>
        </div>

        <div className="text-center">
          <div className={`text-2xl font-bold ${hitRateColor}`}>
            {stats.hitRate.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">Hit Rate</div>
        </div>
      </div>

      <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
          style={{ width: `${stats.hitRate}%` }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Redis cache is{' '}
        {stats.hitRate >= 70 ? 'performing excellently' : stats.hitRate >= 40 ? 'working well' : 'warming up'}
      </p>
    </div>
  );
}
