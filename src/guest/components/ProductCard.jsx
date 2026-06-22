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
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
              product.badge === "New" ? "bg-gradient-to-r from-cyan-500 to-teal-500" :
              product.badge === "Sale" ? "bg-gradient-to-r from-pink-500 to-rose-500" :
              "bg-gradient-to-r from-purple-500 to-indigo-500"
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <FaHeart className={isFavorite ? "text-pink-500" : "text-gray-300"} />
        </button>

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/guest/products/${product.id}`}
            className="flex-1 py-2 bg-white text-gray-700 rounded-lg text-sm font-semibold text-center hover:bg-gray-100 transition"
          >
            Detail
          </Link>
          <button className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition">
            <FaShoppingCart className="text-xs" />
            Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-cyan-600 transition">
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
            <p className="text-lg font-bold text-cyan-600">
              {product.price}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                {product.originalPrice}
              </p>
            )}
          </div>
          <div className="text-xs text-gray-500">
            Stok: <span className="font-semibold text-gray-700">{product.stock}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
