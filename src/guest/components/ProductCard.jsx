import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge */}
        {product.stock === 0 ? (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-gray-500 to-gray-600">
              Stok Habis
            </span>
          </div>
        ) : product.stock <= 5 ? (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-500">
              Stok Terbatas
            </span>
          </div>
        ) : product.badge ? (
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
              product.badge === "New" ? "bg-gradient-to-r from-plum-500 to-gold-500" :
              product.badge === "Sale" ? "bg-gradient-to-r from-pink-500 to-rose-500" :
              "bg-gradient-to-r from-purple-500 to-indigo-500"
            }`}>
              {product.badge}
            </span>
          </div>
        ) : null}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <FaHeart className={isFavorite ? "text-pink-500" : "text-gray-300"} />
        </button>

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/guest/products/${product.id}`}
            className={`block w-full py-3 rounded-xl text-sm font-bold text-center hover:shadow-lg transition ${
              product.stock === 0 
                ? "bg-gray-400 text-white cursor-not-allowed" 
                : "bg-gradient-to-r from-plum-500 to-gold-500 text-white"
            }`}
            onClick={(e) => {
              if (product.stock === 0) {
                e.preventDefault();
                alert("Produk ini sedang stok habis");
              }
            }}
          >
            {product.stock === 0 ? "Stok Habis" : "Lihat Detail Produk"}
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-plum-600 transition">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{product.category}</p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <FaStar className="text-yellow-400" />
            <span className="font-semibold text-gray-700">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-lg font-bold text-plum-600">
              {product.price}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                {product.originalPrice}
              </p>
            )}
          </div>
          <div className="text-xs">
            {product.stock === 0 ? (
              <span className="font-semibold text-red-600">Habis</span>
            ) : product.stock <= 5 ? (
              <span className="font-semibold text-orange-600">Sisa {product.stock}</span>
            ) : (
              <span className="font-semibold text-green-600">Stok: {product.stock}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
