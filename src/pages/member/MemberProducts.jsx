import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaStar } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import Badge from "../../components/Badge";
import { productsAPI } from "../../services/productsAPI";

export default function MemberProducts() {
  const navigate = useNavigate();
  const { profile } = useAuth();
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

  // Member discount berdasarkan level
  const memberDiscounts = {
    Bronze: 0,
    Silver: 0.05,
    Gold: 0.10,
    Platinum: 0.15,
  };

  const memberDiscount = memberDiscounts[profile?.member_level] || 0;

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

  const filteredProducts = useMemo(() => {
    let result = allProducts.map(p => ({
      ...p,
      category: categorizeProduct(p),
      categoryLabel: categorizeProduct(p).charAt(0).toUpperCase() + categorizeProduct(p).slice(1),
      price: Number(p.price),
      image: p.image_url,
      rating: 4.5 + Math.random() * 0.5, // Mock rating
    }));

    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

  const calculateDiscountedPrice = (price) => {
    return price - (price * memberDiscount);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header dengan Member Discount Info */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Belanja Produk</h1>
            <p className="text-cyan-100">Member {profile?.member_level} - Diskon {(memberDiscount * 100).toFixed(0)}%</p>
          </div>
          <Badge variant="white" className="text-cyan-600 font-bold text-lg">
            🎉 Hemat hingga Rp{(memberDiscount * 500000).toLocaleString("id-ID")}
          </Badge>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
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
            Menampilkan <span className="font-semibold">{filteredProducts.length}</span> produk
            {searchQuery && <span> untuk "{searchQuery}"</span>}
          </p>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-cyan-500 focus:outline-none cursor-pointer"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const originalPrice = product.price;
            const discountedPrice = calculateDiscountedPrice(originalPrice);
            
            return (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group">
                <div 
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/member/products/${product.id}`)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <Badge variant={product.badge === "Sale" ? "red" : product.badge === "New" ? "green" : "purple"}>
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                  {memberDiscount > 0 && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="yellow" className="font-bold">
                        -{(memberDiscount * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-xs text-cyan-600 font-semibold mb-1">{product.categoryLabel}</p>
                  <h3 
                    className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-cyan-600 transition"
                    onClick={() => navigate(`/member/products/${product.id}`)}
                  >
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">Stok: {product.stock}</span>
                  </div>

                  <div className="mb-4">
                    {memberDiscount > 0 ? (
                      <div>
                        <p className="text-sm text-gray-400 line-through">
                          Rp {originalPrice.toLocaleString("id-ID")}
                        </p>
                        <p className="text-2xl font-bold text-cyan-600">
                          Rp {discountedPrice.toLocaleString("id-ID")}
                        </p>
                        <p className="text-xs text-green-600 font-semibold">
                          Hemat Rp {(originalPrice - discountedPrice).toLocaleString("id-ID")}
                        </p>
                      </div>
                    ) : (
                      <p className="text-2xl font-bold text-gray-800">
                        Rp {originalPrice.toLocaleString("id-ID")}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => navigate(`/member/products/${product.id}`)}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            );
          })}
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
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
