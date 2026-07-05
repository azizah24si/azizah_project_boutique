import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar, FaShippingFast, FaHeadset, FaShieldAlt, FaUsers, FaShoppingBag, FaHeart, FaAward, FaHandshake, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaTiktok, FaClock, FaSearch } from "react-icons/fa";
import { productsAPI } from "../../services/productsAPI";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll();
      
      // Set featured products (first 4)
      const featured = data.slice(0, 4).map(p => ({
        ...p,
        price: `Rp ${Number(p.price).toLocaleString("id-ID")}`,
        image: p.image_url,
        rating: 4.5 + Math.random() * 0.5,
      }));
      setFeaturedProducts(featured);
      
      // Set all products for catalog section
      setAllProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const values = [
    {
      icon: <FaHeart className="text-3xl" />,
      title: "Passion for Fashion",
      desc: "Kami mencintai fashion dan berkomitmen menghadirkan yang terbaik"
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Quality First",
      desc: "Kualitas premium adalah prioritas utama kami"
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Customer Trust",
      desc: "Kepercayaan pelanggan adalah aset terbesar kami"
    },
    {
      icon: <FaAward className="text-3xl" />,
      title: "Excellence Service",
      desc: "Pelayanan terbaik di setiap interaksi"
    }
  ];

  const categories = [
    { id: "all", name: "Semua Produk" },
    { id: "dress", name: "Dress" },
    { id: "blouse", name: "Blouse" },
    { id: "outer", name: "Outer" },
    { id: "hijab", name: "Hijab" },
  ];

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

  const filteredProducts = (() => {
    let result = allProducts.map(p => ({
      ...p,
      category: categorizeProduct(p),
      categoryLabel: categorizeProduct(p).charAt(0).toUpperCase() + categorizeProduct(p).slice(1),
      price: `Rp ${Number(p.price).toLocaleString("id-ID")}`,
      priceNum: Number(p.price),
      image: p.image_url,
      rating: 4.5 + Math.random() * 0.5,
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
      default:
        result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  })();

  return (
    <div>
      {/* Hero Section - Beranda */}
      <section id="beranda" className="scroll-mt-0">
        <Hero />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <FaShippingFast className="text-3xl" />, title: "Gratis Ongkir", desc: "Untuk pembelian minimal Rp 200.000" },
              { icon: <FaHeadset className="text-3xl" />, title: "Customer Service 24/7", desc: "Siap membantu kapan saja" },
              { icon: <FaShieldAlt className="text-3xl" />, title: "Garansi Kualitas", desc: "100% original & berkualitas" },
              { icon: <FaStar className="text-3xl" />, title: "Rating Terbaik", desc: "4.9/5 dari 2,300+ customer" }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition-all">
                <div className="text-plum-500 flex justify-center mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Produk Unggulan */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Produk Unggulan</h2>
              <p className="text-gray-600">Koleksi terpopuler minggu ini</p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                  <div className="w-full h-64 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-6 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Full Catalog Section - Produk */}
      <section id="produk" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Katalog Produk</h2>
            <p className="text-gray-600">Temukan koleksi fashion terbaik untuk gaya Anda</p>
          </div>

          {/* Search & Filter */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm mb-8">
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
            <div className="bg-gray-50 rounded-2xl p-12 text-center">
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
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Apa Kata Mereka?</h2>
            <p className="text-gray-600">Testimoni dari pelanggan setia kami</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Siti Nurhaliza", role: "Fashion Enthusiast", rating: 5, comment: "Kualitas produk sangat bagus! Desainnya trendy dan bahan nyaman dipakai.", avatar: "https://i.pravatar.cc/150?img=1" },
              { name: "Aisyah Rahman", role: "Loyal Customer", rating: 5, comment: "Pelayanan ramah dan pengiriman cepat. Sudah langganan 2 tahun!", avatar: "https://i.pravatar.cc/150?img=5" },
              { name: "Nadia Putri", role: "Regular Buyer", rating: 5, comment: "Koleksinya selalu update dan sesuai trend. Recommended!", avatar: "https://i.pravatar.cc/150?img=9" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-plum-400 to-gold-400 bg-clip-text text-transparent">
                500+
              </h3>
              <p className="text-gray-400">Produk Fashion</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                2,300+
              </h3>
              <p className="text-gray-400">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                5,000+
              </h3>
              <p className="text-gray-400">Transaksi Sukses</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                4.9★
              </h3>
              <p className="text-gray-400">Rating Terbaik</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Tentang Kami */}
      <section id="tentang" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Tentang Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Perjalanan kami dalam menghadirkan fashion berkualitas untuk wanita Indonesia
            </p>
          </div>

          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Cerita Kami</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-800">Jijah Boutique</strong> didirikan pada tahun 2015 dengan visi 
                  menghadirkan fashion berkualitas tinggi yang terjangkau untuk wanita Indonesia. Dimulai dari 
                  sebuah toko kecil, kini kami telah melayani lebih dari 2,300 pelanggan setia di seluruh Indonesia.
                </p>
                <p>
                  Kami percaya bahwa setiap wanita berhak tampil percaya diri dengan pakaian yang tidak hanya 
                  indah dipandang, tetapi juga nyaman dikenakan. Itulah mengapa kami sangat selektif dalam memilih 
                  bahan dan desain untuk setiap koleksi kami.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=700&fit=crop"
                alt="Boutique Store"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Nilai-Nilai Kami</h3>
              <p className="text-gray-600">Prinsip yang menjadi fondasi dalam setiap langkah kami</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl text-center hover:shadow-lg transition-all">
                  <div className="text-plum-500 flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Perjalanan Kami</h3>
              <p className="text-gray-600">Milestone penting dalam sejarah Jijah Boutique</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {[
                  { year: "2015", event: "Jijah Boutique didirikan" },
                  { year: "2017", event: "Membuka showroom pertama" },
                  { year: "2019", event: "Mencapai 1000+ happy customers" },
                  { year: "2021", event: "Ekspansi koleksi dan tim" },
                  { year: "2023", event: "Award Best Boutique Jakarta" },
                  { year: "2025", event: "Platform digital & 2300+ customers" }
                ].map((milestone, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-plum-500 to-gold-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
                      <p className="text-gray-700 font-medium">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Kontak */}
      <section id="kontak" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Hubungi Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami siap membantu Anda! Hubungi kami melalui channel yang tersedia atau kunjungi toko kami.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shrink-0">
                    <FaWhatsapp className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">WhatsApp</h3>
                    <p className="text-gray-600 mb-2">Chat langsung dengan customer service</p>
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                    >
                      Chat Sekarang
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-plum-400 to-gold-500 rounded-xl flex items-center justify-center shrink-0">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Telepon</h3>
                    <a href="tel:+6281234567890" className="text-plum-600 font-semibold hover:text-plum-700 text-lg">
                      +62 812-3456-7890
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Senin - Minggu: 09:00 - 21:00 WIB</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shrink-0">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Email</h3>
                    <a href="mailto:info@jijahboutique.com" className="text-plum-600 font-semibold hover:text-plum-700">
                      info@jijahboutique.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Balasan dalam 1x24 jam</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Alamat Toko</h3>
                    <p className="text-gray-700 font-medium">
                      Jl. Fashion Boulevard No. 123<br />
                      Jakarta Selatan, DKI Jakarta 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours & Social Media */}
            <div className="space-y-6">
              {/* Operating Hours */}
              <div className="bg-gradient-to-br from-plum-500 to-gold-500 text-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <FaClock className="text-2xl" />
                  <h3 className="text-xl font-bold">Jam Operasional</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="font-medium">Senin - Jumat</span>
                    <span className="font-bold">09:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="font-medium">Sabtu</span>
                    <span className="font-bold">09:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Minggu</span>
                    <span className="font-bold">10:00 - 21:00</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                <p className="text-gray-600 mb-4">Ikuti media sosial kami untuk update terbaru</p>
                <div className="grid grid-cols-2 gap-3">
                  <a href="#" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition">
                    <FaInstagram className="text-2xl text-pink-500" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Instagram</p>
                      <p className="text-xs text-gray-500">@jijahboutique</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition">
                    <FaFacebook className="text-2xl text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Facebook</p>
                      <p className="text-xs text-gray-500">Jijah Boutique</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition">
                    <FaTiktok className="text-2xl text-gray-800" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">TikTok</p>
                      <p className="text-xs text-gray-500">@jijahboutique</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition">
                    <FaWhatsapp className="text-2xl text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">WhatsApp</p>
                      <p className="text-xs text-gray-500">Business</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-plum-500 to-gold-500 rounded-3xl p-12 text-center text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">Butuh Bantuan Segera?</h3>
            <p className="text-lg mb-6 opacity-90">
              Tim customer service kami siap membantu Anda kapan saja!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-plum-600 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
              >
                Chat WhatsApp
              </a>
              <a
                href="tel:+6281234567890"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold border-2 border-white hover:bg-white hover:text-plum-600 transition-all"
              >
                Telepon Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
