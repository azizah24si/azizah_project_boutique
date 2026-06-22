import { Link } from "react-router-dom";
import { FaArrowRight, FaShoppingBag } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-cyan-50 via-teal-50 to-cyan-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle,#0891b2_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full text-sm font-semibold shadow-lg">
                ✨ New Collection 2025
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
              Temukan Gaya
              <br />
              <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Fashion Terbaikmu
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Koleksi fashion terlengkap dengan desain trendy dan berkualitas premium. 
              Wujudkan penampilan impianmu bersama Jijah Boutique.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/guest/products"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
              >
                <FaShoppingBag />
                Lihat Koleksi
                <FaArrowRight className="text-sm" />
              </Link>
              
              <Link
                to="/guest/reservation"
                className="flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-cyan-500 hover:text-cyan-600 transition-all"
              >
                Reservasi Sekarang
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                <h3 className="text-3xl font-bold text-cyan-600">500+</h3>
                <p className="text-sm text-gray-600 mt-1">Produk Fashion</p>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                <h3 className="text-3xl font-bold text-teal-600">2,300+</h3>
                <p className="text-sm text-gray-600 mt-1">Pelanggan Setia</p>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                <h3 className="text-3xl font-bold text-pink-600">4.9★</h3>
                <p className="text-sm text-gray-600 mt-1">Rating Terbaik</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=700&fit=crop"
                alt="Fashion Model"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-gradient-to-br from-pink-400 to-rose-400 rounded-3xl -z-10 animate-pulse"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-3xl -z-10"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-8 right-8 bg-white p-4 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <FaShoppingBag className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bestseller</p>
                  <p className="font-bold text-gray-800">Dress Collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
