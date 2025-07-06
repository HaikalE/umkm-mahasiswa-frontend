import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  MapPin,
  Phone,
  Globe,
  ChevronDown,
  Grid3X3,
  List
} from 'lucide-react';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  // Mock products data
  const [products] = useState([
    {
      id: 1,
      name: 'Kopi Arabica Premium',
      description: 'Kopi arabica pilihan dengan cita rasa yang khas dan aroma yang menggugah selera. Dipetik langsung dari kebun di dataran tinggi.',
      price: 85000,
      originalPrice: 100000,
      discount: 15,
      images: ['https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop'],
      category: 'food_beverage',
      rating: 4.8,
      reviews: 127,
      sold: 89,
      stock: 25,
      umkm: {
        name: 'Warung Kopi Sederhana',
        location: 'Bandung',
        verified: true,
        rating: 4.6
      },
      tags: ['Organik', 'Single Origin', 'Medium Roast'],
      featured: true
    },
    {
      id: 2,
      name: 'Batik Tulis Klasik',
      description: 'Batik tulis dengan motif klasik Jawa. Dibuat dengan teknik tradisional dan pewarna alami. Cocok untuk acara formal.',
      price: 250000,
      originalPrice: 300000,
      discount: 17,
      images: ['https://images.unsplash.com/photo-1564584217132-2271339856bf?w=400&h=300&fit=crop'],
      category: 'fashion',
      rating: 4.9,
      reviews: 45,
      sold: 23,
      stock: 12,
      umkm: {
        name: 'Batik Heritage',
        location: 'Yogyakarta',
        verified: true,
        rating: 4.8
      },
      tags: ['Handmade', 'Tradisional', 'Premium'],
      featured: false
    },
    {
      id: 3,
      name: 'Kerajinan Anyaman Bambu',
      description: 'Tas anyaman bambu ramah lingkungan dengan desain modern. Kuat, tahan lama, dan cocok untuk daily use.',
      price: 75000,
      originalPrice: 75000,
      discount: 0,
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'],
      category: 'handicraft',
      rating: 4.5,
      reviews: 68,
      sold: 156,
      stock: 8,
      umkm: {
        name: 'Kerajinan Bambu Lestari',
        location: 'Bali',
        verified: true,
        rating: 4.7
      },
      tags: ['Eco-friendly', 'Handcraft', 'Sustainable'],
      featured: true
    }
  ]);

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'food_beverage', label: 'Makanan & Minuman' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'handicraft', label: 'Kerajinan Tangan' },
    { value: 'beauty', label: 'Kecantikan' },
    { value: 'home_living', label: 'Rumah & Dekorasi' },
    { value: 'electronics', label: 'Elektronik' },
    { value: 'books', label: 'Buku & Media' }
  ];

  const handleToggleFavorite = (productId) => {
    setFavoriteProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const ProductCard = ({ product }) => (
    <div className="card overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-danger-500 text-white px-2 py-1 rounded text-xs font-medium">
            -{product.discount}%
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 right-2 bg-warning-500 text-white px-2 py-1 rounded text-xs font-medium">
            Featured
          </div>
        )}
        <button 
          onClick={() => handleToggleFavorite(product.id)}
          className={`absolute bottom-2 right-2 p-2 rounded-full transition-all duration-200 ${
            favoriteProducts.includes(product.id)
              ? 'bg-danger-100 text-danger-600'
              : 'bg-white/80 text-gray-600 hover:bg-danger-100 hover:text-danger-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${favoriteProducts.includes(product.id) ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-warning-500 fill-current" />
            <span className="text-sm text-gray-700 ml-1">{product.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
          </div>
          <span className="text-sm text-gray-500 ml-auto">
            {product.sold} terjual
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Stok: {product.stock}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-xs font-semibold text-primary-600">
                {product.umkm.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="font-medium">{product.umkm.name}</div>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                {product.umkm.location}
              </div>
            </div>
          </div>
          {product.umkm.verified && (
            <div className="w-5 h-5 bg-success-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <button className="btn btn-outline btn-sm flex-1">
            <Eye className="w-4 h-4 mr-1" />
            Detail
          </button>
          <button className="btn btn-primary btn-sm flex-1">
            <ShoppingCart className="w-4 h-4 mr-1" />
            Beli
          </button>
        </div>
      </div>
    </div>
  );

  const ProductListItem = ({ product }) => (
    <div className="card p-6 hover:shadow-md transition-all duration-300">
      <div className="flex">
        <div className="relative w-32 h-32 flex-shrink-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
          {product.discount > 0 && (
            <div className="absolute top-1 left-1 bg-danger-500 text-white px-1 py-0.5 rounded text-xs">
              -{product.discount}%
            </div>
          )}
        </div>

        <div className="ml-6 flex-1">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-warning-500 fill-current" />
                <span className="text-sm text-gray-700 ml-1">{product.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({product.reviews} review)</span>
                <span className="text-sm text-gray-500 ml-4">{product.sold} terjual</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-semibold text-primary-600">
                    {product.umkm.name.charAt(0)}
                  </span>
                </div>
                <span className="font-medium">{product.umkm.name}</span>
                <MapPin className="w-3 h-3 ml-2 mr-1" />
                <span>{product.umkm.location}</span>
                {product.umkm.verified && (
                  <div className="w-4 h-4 bg-success-100 rounded-full flex items-center justify-center ml-2">
                    <div className="w-1.5 h-1.5 bg-success-500 rounded-full"></div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right ml-6">
              <div className="mb-2">
                <div className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </div>
                {product.discount > 0 && (
                  <div className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                Stok: {product.stock}
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => handleToggleFavorite(product.id)}
                  className={`p-2 rounded transition-colors ${
                    favoriteProducts.includes(product.id)
                      ? 'text-danger-600 bg-danger-50'
                      : 'text-gray-400 hover:text-danger-600 hover:bg-danger-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favoriteProducts.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
                <button className="btn btn-outline btn-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Detail
                </button>
                <button className="btn btn-primary btn-sm">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Beli
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Produk UMKM</h1>
          <p className="text-gray-600 mt-1">
            Temukan produk berkualitas dari UMKM lokal Indonesia
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10 w-full"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-input w-full"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="form-input w-full"
              >
                <option value="all">Semua Harga</option>
                <option value="0-50000">Di bawah Rp 50rb</option>
                <option value="50000-100000">Rp 50rb - 100rb</option>
                <option value="100000-250000">Rp 100rb - 250rb</option>
                <option value="250000+">Di atas Rp 250rb</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-input w-full"
              >
                <option value="newest">Terbaru</option>
                <option value="price_low">Harga Terendah</option>
                <option value="price_high">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="popular">Paling Populer</option>
              </select>
            </div>
          </div>
        </div>

        {/* View Toggle and Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            Menampilkan {products.length} produk
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Tampilan:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Sebelumnya
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700">
              1
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;