'use client';

import { useState, useEffect } from 'react';
import { ProductWithCache, CreateProductDto, UpdateProductDto, Product } from '@/types/product';
import { api } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import CacheIndicator from '@/components/CacheIndicator';
import ProductForm from '@/components/ProductForm';

export default function Home() {
  const [products, setProducts] = useState<ProductWithCache[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithCache | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadProducts();
  }, [searchQuery, selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params: any = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory) params.category = selectedCategory;
      
      const data = await api.getProducts(params);
      const productsWithCacheFlag: ProductWithCache[] = data.data.map((p) => ({
        ...p,
        cacheHit: data.cacheHit,
      }));
      setProducts(productsWithCacheFlag);
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data.data.map((p) => p.category))
      ).sort();
      setCategories(uniqueCategories);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = async (product: ProductWithCache) => {
    try {
      // Load fresh data with cache info
      const freshProduct = await api.getProduct(product.id);
      setSelectedProduct(freshProduct);
    } catch (err: any) {
      setError(err.message || 'Failed to load product details');
    }
  };

  const handleCreateProduct = async (data: CreateProductDto) => {
    try {
      await api.createProduct(data);
      setShowForm(false);
      setEditingProduct(undefined);
      await loadProducts();
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
      throw err;
    }
  };

  const handleUpdateProduct = async (data: UpdateProductDto) => {
    if (!editingProduct) return;
    
    try {
      await api.updateProduct(editingProduct.id, data);
      setShowForm(false);
      setEditingProduct(undefined);
      setSelectedProduct(null);
      await loadProducts();
    } catch (err: any) {
      setError(err.message || 'Failed to update product');
      throw err;
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this trauma? This action cannot be undone.')) {
      return;
    }
    
    try {
      await api.deleteProduct(id);
      setSelectedProduct(null);
      await loadProducts();
    } catch (err: any) {
      setError(err.message || 'Failed to delete product');
    }
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Welcome to <span className="text-red-500">Trauma In A Can™</span>
        </h1>
        <p className="text-xl text-gray-400 mb-2">
          Experience Life's Most Uncomfortable Moments, Bottled Fresh Daily
        </p>
        <p className="text-sm text-gray-500">
          🥫 Premium Quality • 💯 100% Authentic • ⚡ Redis-Cached for Your Convenience
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          <p className="font-medium">⚠️ Error: {error}</p>
          <button
            onClick={() => setError(null)}
            className="text-xs underline mt-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Cache Stats & Admin Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <CacheIndicator />
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-bold text-gray-300 mb-3">Admin Actions</h3>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingProduct(undefined);
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            + Add New Trauma
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        onSearch={setSearchQuery}
        onCategoryFilter={setSelectedCategory}
        categories={categories}
      />

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              {editingProduct ? 'Edit Trauma' : 'Create New Trauma'}
            </h2>
            <ProductForm
              product={editingProduct}
              onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(undefined);
              }}
            />
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-white">{selectedProduct.name}</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Cache indicator */}
            {selectedProduct.cacheHit !== undefined && (
              <div className="mb-4">
                <span
                  className={`text-sm px-3 py-1.5 rounded-full font-mono ${
                    selectedProduct.cacheHit
                      ? 'bg-green-500/20 text-green-400 border border-green-500'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500'
                  }`}
                >
                  {selectedProduct.cacheHit ? '⚡ Loaded from Cache' : '💾 Loaded from Database'}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 flex items-center justify-center">
                {selectedProduct.imageUrl ? (
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="max-w-full h-auto rounded"
                  />
                ) : (
                  <div className="text-9xl">🥫</div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Description</h3>
                  <p className="text-gray-200">{selectedProduct.description}</p>
                </div>

                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Price</h3>
                  <p className="text-3xl font-bold text-red-500">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Category</h3>
                    <p className="text-gray-200">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Stock</h3>
                    <p className="text-gray-200">{selectedProduct.stockQuantity} units</p>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => openEditForm(selectedProduct)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    ✏️ Edit Trauma
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(selectedProduct.id)}
                    className="w-full bg-red-900/50 hover:bg-red-900 text-red-300 font-medium py-2 px-4 rounded-lg transition-colors border border-red-800"
                  >
                    🗑️ Delete Trauma
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700 text-xs text-gray-500">
              <p>Created: {new Date(selectedProduct.createdAt).toLocaleString()}</p>
              <p>Updated: {new Date(selectedProduct.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin text-6xl mb-4">🥫</div>
          <p className="text-gray-400">Loading traumas...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-xl text-gray-400 mb-2">No traumas found</p>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              Available Traumas ({products.length})
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fun footer note */}
      <div className="text-center py-8 text-sm text-gray-500">
        <p>💡 Pro tip: Refresh the page to see cache hits increase!</p>
        <p className="mt-2">All traumas are stored in PostgreSQL and cached in Redis for optimal performance.</p>
      </div>
    </div>
  );
}
