'use client';

export default function CacheIndicator() {
  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-300 flex items-center">
          <span className="mr-2">⚡</span> Cache Insights
        </h3>
      </div>
      <p className="text-sm text-gray-400">
        Backend responses include a <code>cacheHit</code> flag on product fetches and list queries. Watch the
        badges on cards or detail view to see when Redis serves the data.
      </p>
    </div>
  );
}
