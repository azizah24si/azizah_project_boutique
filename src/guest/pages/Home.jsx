import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar, FaShippingFast, FaHeadset, FaShieldAlt, FaUsers } from "react-icons/fa";

export default function Home() {
  const featuredProducts = [
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
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop"
    }
  ];

  const features = [
    {
      icon: <FaShippingFast className="text-3xl" />,
      title: "Gratis Ongkir",
      desc: "Untuk pembelian minimal Rp 200.000"
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "Customer Service 24/7",
      desc: "Siap membantu kapan saja"
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Garansi Kualitas",
      desc: "100% original & berkualitas"
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Rating Terbaik",
      desc: "4.9/5 dari 2,300+ customer"
    }
  ];

  const testimonials = [
    {
      name: "Siti Nurhaliza",
      role: "Fashion Enthusiast",
      rating: 5,
      comment: "Kualitas produk sangat bagus! Desainnya trendy dan bahan nyaman dipakai.",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Aisyah Rahman",
      role: "Loyal Customer",
      rating: 5,
      comment: "Pelayanan ramah dan pengiriman cepat. Sudah langganan 2 tahun!",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Nadia Putri",
      role: "Regular Buyer",
      rating: 5,
      comment: "Koleksinya selalu update dan sesuai trend. Recommended!",
      avatar: "https://i.pravatar.cc/150?img=9"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition-all">
                <div className="text-cyan-500 flex justify-center mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Produk Unggulan</h2>
              <p className="text-gray-600">Koleksi terpopuler minggu ini</p>
            </div>
            <Link
              to="/guest/products"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Lihat Semua
              <FaArrowRight className="text-sm" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
            {testimonials.map((testimonial, index) => (
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
              <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
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
    </div>
  );
}
