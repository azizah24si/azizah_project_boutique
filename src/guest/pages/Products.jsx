import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { FaSearch, FaFilter } from "react-icons/fa";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Semua Produk" },
    { id: "dress", name: "Dress" },
    { id: "blouse", name: "Blouse" },
    { id: "outer", name: "Outer" },
    { id: "hijab", name: "Hijab" },
    { id: "pants", name: "Celana" },
  ];

  const products = [
    {
      id: 1,
      name: "Dress Floral Premium",
      category: "Dress Collection",
      price: "Rp 459.000",
      originalPrice: "Rp 599.000",
      rating: 4.9,
      stock: 15,
      badge: "Sale",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop"
    },
    {
      id: 2,
      name: "Korean Style Blouse",
      category: "Blouse Collection",
      price: "Rp 289.000",
      rating: 4.8,
      stock: 23,
      badge: "New",
      image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop"
    },
    {
      id: 3,
      name: "Vintage Outer Premium",
      category: "Outer Collection",
      price: "Rp 399.000",
      rating: 4.9,
      stock: 12,
      badge: "Trending",
      image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=500&fit=crop"
    },
    {
      id: 4,
      name: "Hijab Pashmina Silk",
      category: "Hijab Collection",
      price: "Rp 129.000",
      rating: 5.0,
      stock: 45,
      badge: "New",
      image: "https://images.unsplash.com/photo-1583003457779-325c24f1aa00?w=400&h=500&fit=crop"
    },
    {
      id: 5,
      name: "Maxi Dress Elegant",
      category: "Dress Collection",
      price: "Rp 529.000",
      rating: 4.7,
      stock: 8,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop"
    },
    {
      id: 6,
      name: "Office Blouse White",
      category: "Blouse Collection",
      price: "Rp 249.000",
      rating: 4.6,
      stock: 30,
      image: "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=400&h=500&fit=crop"
    },
    {
      id: 7,
      name: "Blazer Premium Black",
      category: "Outer Collection",
      price: "Rp 649.000",
      rating: 4.9,
      stock: 5,
      badge: "Trending",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop"
    },
    {
      id: 8,
      name: "Hijab Segi Empat",
      category: "Hijab Collection",
      price: "Rp 89.000",
      rating: 4.8,
      stock: 60,
      image: "https://images.unsplash.com/photo-1583003447802-33c6f8dd827d?w=400&h=500&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Katalog Produk</h1>
          <p className="text-gray-600">Temukan koleksi fashion terbaik untuk gaya Anda</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Menampilkan <span className="font-semibold">{products.length}</span> produk
            </p>
            <select className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-cyan-500 focus:outline-none">
              <option>Urutkan: Terpopuler</option>
              <option>Harga: Terendah</option>
              <option>Harga: Tertinggi</option>
              <option>Terbaru</option>
              <option>Rating Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300 transition">
            Previous
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-semibold">
            1
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition">
            2
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition">
            3
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300 transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
