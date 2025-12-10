'use client';

import { ProductWithCache } from '@/types/product';
import Image from 'next/image';

interface ProductCardProps {
  product: ProductWithCache;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const isLowStock = product.stockQuantity < 10;
  const isOutOfStock = product.stockQuantity === 0;

  return (
    <div
      onClick={onClick}
      className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg overflow-hidden hover:border-red-500 transition-all duration-300 cursor-pointer group hover:scale-105"
    >
      {/* Cache indicator */}
      {product.cacheHit !== undefined && (
        <div className="absolute top-2 right-2 z-10">
          <span
            className={`text-xs px-2 py-1 rounded-full font-mono ${
              product.cacheHit
                ? 'bg-green-500/80 text-white'
                : 'bg-yellow-500/80 text-black'
            }`}
          >
            {product.cacheHit ? '⚡ CACHED' : '💾 DB'}
          </span>
        </div>
      )}

      {/* Product image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="text-6xl">🥫</div>
        )}
        
        {/* Stock badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <span className="text-red-500 font-bold text-xl">SOLD OUT</span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
            {product.name}
          </h3>
          <span className="text-red-500 font-bold text-xl">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between text-xs">
          <span className="px-2 py-1 bg-gray-700 rounded text-gray-300">
            {product.category}
          </span>
          
          <span
            className={`px-2 py-1 rounded font-medium ${
              isOutOfStock
                ? 'bg-red-900/50 text-red-300'
                : isLowStock
                ? 'bg-yellow-900/50 text-yellow-300'
                : 'bg-green-900/50 text-green-300'
            }`}
          >
            {isOutOfStock
              ? 'Out of stock'
              : `${product.stockQuantity} in stock`}
          </span>
        </div>
      </div>
    </div>
  );
}
