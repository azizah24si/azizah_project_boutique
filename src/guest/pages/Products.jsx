import { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";
import { productsAPI } from "../../services/productsAPI";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll();
      setAllProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "Semua Produk" },
    { id: "dress", name: "Dress" },
    { id: "blouse", name: "Blouse" },
    { id: "outer", name: "Outer" },
    { id: "hijab", name: "Hijab" },
  ];

  // Helper function to categorize products based on name/description
  const categorizeProduct = (product) => {
    const name = product.name.toLowerCase();
    const desc = (product.description || "").toLowerCase();
    const text = name + " " + desc;

    if (text.includes("dress")) return "dress";
    if (text.includes("blouse") || text.includes("blus") || text.includes("top") || text.includes("shirt")) return "blouse";
    if (text.includes("outer") || text.includes("blazer") || text.includes("cardigan") || text.includes("jacket")) return "outer";
    if (text.includes("hijab") || text.includes("pashmina") || text.includes("voal")) return "hijab";
    return "other";
  };

  // Filter dan sort products
  const filteredProducts = useMemo(() => {
    let result = allProducts.map(p => ({
      ...p,
      category: categorizeProduct(p),
      categoryLabel: categorizeProduct(p).charAt(0).toUpperCase() + categorizeProduct(p).slice(1),
      price: `Rp ${Number(p.price).toLocaleString("id-ID")}`,
      priceNum: Number(p.price),
      image: p.image_url,
      rating: 4.5 + Math.random() * 0.5, // Mock rating for guest view
    }));

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.priceNum - b.priceNum);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.priceNum - a.priceNum);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // popular
        result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

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
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-plum-500 focus:outline-none transition"
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
                      ? "bg-gradient-to-r from-plum-500 to-gold-500 text-white shadow-lg"
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
              Menampilkan <span className="font-semibold">{filteredProducts.length}</span> produk
              {searchQuery && <span> untuk "{searchQuery}"</span>}
            </p>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-plum-500 focus:outline-none cursor-pointer"
            >
              <option value="popular">Urutkan: Terpopuler</option>
              <option value="price-low">Harga: Terendah</option>
              <option value="price-high">Harga: Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="name">Nama: A-Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="w-full h-64 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={{...product, category: product.categoryLabel}} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h3>
            <p className="text-gray-600 mb-6">
              Maaf, tidak ada produk yang sesuai dengan pencarian Anda.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-6 py-3 bg-gradient-to-r from-plum-500 to-gold-500 text-white rounded-xl font-semibold hover:shadow-lg transition"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Pagination - hanya tampil jika ada produk */}
        {filteredProducts.length > 8 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300 transition">
              Previous
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-plum-500 to-gold-500 text-white rounded-lg font-semibold">
              1
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition">
              2
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300 transition">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
