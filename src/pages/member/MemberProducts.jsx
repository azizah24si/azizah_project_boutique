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
      {/* Header dengan Member Discount Info - IMPROVED DESIGN */}
      <div className="relative overflow-hidden bg-gradient-to-br from-plum-600 via-purple-600 to-gold-500 rounded-3xl shadow-xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
        
        {/* Floating Shapes */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-400/20 rounded-full blur-2xl"></div>

        <div className="relative p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🛍️</span>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                    Belanja Produk
                  </h1>
                  <p className="text-white/90 text-sm">
                    Temukan koleksi fashion terbaik dengan harga spesial
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Member Badge */}
            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/30 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-white/80 text-xs font-medium mb-1">Status Member</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {profile?.member_level === "Bronze" && "🥉"}
                      {profile?.member_level === "Silver" && "🥈"}
                      {profile?.member_level === "Gold" && "🥇"}
                      {profile?.member_level === "Platinum" && "💎"}
                    </span>
                    <span className="text-xl font-bold text-white">
                      {profile?.member_level || "Bronze"}
                    </span>
                  </div>
                </div>
                
                <div className="w-px h-12 bg-white/30"></div>
                
                <div className="text-center">
                  <p className="text-white/80 text-xs font-medium mb-1">Diskon Khusus</p>
                  <p className="text-3xl font-bold text-yellow-300">
                    {(memberDiscount * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
              
              {memberDiscount > 0 && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-white/90 text-xs text-center">
                    💰 Hemat hingga{" "}
                    <span className="font-bold text-yellow-300">
                      Rp {(memberDiscount * 500000).toLocaleString("id-ID")}
                    </span>{" "}
                    untuk setiap pembelian!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter - IMPROVED */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search Bar */}
          <div className="flex-1 relative group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-plum-500 transition" />
            <input
              type="text"
              placeholder="Cari produk favoritmu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-plum-500 focus:ring-4 focus:ring-plum-100 focus:outline-none transition-all text-gray-700 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:border-plum-500 focus:ring-4 focus:ring-plum-100 focus:outline-none cursor-pointer bg-white hover:border-gray-300 transition-all font-medium text-gray-700"
          >
            <option value="popular">⭐ Terpopuler</option>
            <option value="price-low">💰 Harga Terendah</option>
            <option value="price-high">💎 Harga Tertinggi</option>
            <option value="rating">🏆 Rating Tertinggi</option>
            <option value="name">🔤 Nama A-Z</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-plum-500 to-purple-600 text-white shadow-lg shadow-plum-500/30 scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 pt-5 border-t border-gray-200 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-600">
              Menampilkan <span className="font-bold text-plum-600">{filteredProducts.length}</span> produk
              {searchQuery && (
                <span className="ml-1">
                  untuk <span className="font-semibold text-gray-800">"{searchQuery}"</span>
                </span>
              )}
            </p>
          </div>
          
          {(searchQuery || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-sm text-plum-600 hover:text-plum-700 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>↺</span>
              <span>Reset Filter</span>
            </button>
          )}
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
            const savings = originalPrice - discountedPrice;
            
            return (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Image Container */}
                <div 
                  className="relative overflow-hidden cursor-pointer bg-gray-50"
                  onClick={() => navigate(`/member/products/${product.id}`)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.badge && (
                      <Badge variant={product.badge === "Sale" ? "red" : product.badge === "New" ? "green" : "purple"}>
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  
                  {memberDiscount > 0 && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
                        -{(memberDiscount * 100).toFixed(0)}% OFF
                      </div>
                    </div>
                  )}

                  {/* Stock Warning */}
                  {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <span>🔥</span>
                        <span>Stok Terbatas!</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block px-3 py-1 bg-plum-50 text-plum-600 text-xs font-semibold rounded-full">
                      {product.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <FaStar className="text-yellow-400 text-xs" />
                      <span className="text-sm font-bold text-gray-700">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 
                    className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 cursor-pointer hover:text-plum-600 transition min-h-[3.5rem]"
                    onClick={() => navigate(`/member/products/${product.id}`)}
                  >
                    {product.name}
                  </h3>
                  
                  {/* Stock Info */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <span className={`text-xs font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {product.stock > 10 ? `${product.stock} pcs tersedia` : product.stock > 0 ? `Hanya ${product.stock} pcs` : 'Habis'}
                    </span>
                  </div>

                  {/* Price Section */}
                  <div className="mb-4 p-3 bg-gradient-to-br from-gray-50 to-plum-50 rounded-xl">
                    {memberDiscount > 0 ? (
                      <>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Harga Normal:</span>
                          <span className="text-sm text-gray-400 line-through">
                            Rp {originalPrice.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs font-semibold text-plum-600">Harga Member:</span>
                          <span className="text-2xl font-bold text-plum-600">
                            Rp {Math.floor(discountedPrice).toLocaleString("id-ID")}
                          </span>
                        </div>
                        {savings > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs text-green-600 font-bold flex items-center justify-between">
                              <span>💰 Hemat</span>
                              <span>Rp {Math.floor(savings).toLocaleString("id-ID")}</span>
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">
                          Rp {originalPrice.toLocaleString("id-ID")}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => navigate(`/member/products/${product.id}`)}
                    disabled={product.stock === 0}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      product.stock === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-plum-500 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {product.stock === 0 ? (
                      <>
                        <span>❌</span>
                        <span>Stok Habis</span>
                      </>
                    ) : (
                      <>
                        <span>🛒</span>
                        <span>Lihat Detail</span>
                      </>
                    )}
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
            className="px-6 py-3 bg-gradient-to-r from-plum-500 to-gold-500 text-white rounded-xl font-semibold hover:shadow-lg transition"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
