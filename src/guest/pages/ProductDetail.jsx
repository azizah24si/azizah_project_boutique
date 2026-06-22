import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaHeart, FaShoppingCart, FaWhatsapp, FaShippingFast, FaShieldAlt, FaArrowLeft } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data
  const product = {
    id: id,
    name: "Dress Floral Premium Collection",
    category: "Dress Collection",
    price: "Rp 459.000",
    originalPrice: "Rp 599.000",
    discount: "23%",
    rating: 4.9,
    reviews: 127,
    stock: 15,
    description: "Dress floral premium dengan bahan berkualitas tinggi, nyaman dipakai untuk berbagai acara. Desain elegan dengan motif bunga yang cantik dan feminin.",
    features: [
      "Bahan premium cotton blend",
      "Nyaman dan adem",
      "Tidak mudah kusut",
      "Tersedia berbagai ukuran",
      "Cocok untuk segala acara"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Pink", hex: "#ffc0cb" },
      { name: "Blue", hex: "#87ceeb" },
      { name: "White", hex: "#ffffff" }
    ],
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop"
    ]
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleWhatsAppOrder = () => {
    const message = `Halo, saya tertarik dengan produk:\n\nNama: ${product.name}\nHarga: ${product.price}\nUkuran: ${selectedSize}\nWarna: ${selectedColor}\nJumlah: ${quantity}\n\nApakah produk ini tersedia?`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/guest/products"
          className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-cyan-600 transition"
        >
          <FaArrowLeft />
          <span className="font-medium">Kembali ke Produk</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === image
                      ? "border-cyan-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-cyan-600 font-semibold mb-2">{product.category}</p>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="font-bold text-gray-800">{product.rating}</span>
                    </div>
                    <span className="text-gray-500">({product.reviews} ulasan)</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <FaHeart className={isFavorite ? "text-pink-500" : "text-gray-400"} />
                </button>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl font-bold text-cyan-600">{product.price}</span>
                  <span className="text-xl text-gray-400 line-through">{product.originalPrice}</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-sm font-bold">
                    -{product.discount}
                  </span>
                </div>
                <p className="text-sm text-green-600 font-semibold">✓ Stok tersedia: {product.stock} pcs</p>
              </div>

              {/* Description */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-bold text-gray-800 mb-2">Deskripsi</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">Keunggulan Produk</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Pilih Ukuran</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg font-bold transition ${
                        selectedSize === size
                          ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Pilih Warna</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 rounded-lg border-2 transition ${
                        selectedColor === color.name
                          ? "border-cyan-500 scale-110"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Jumlah</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="w-10 h-10 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 h-10 text-center border-2 border-gray-200 rounded-lg font-bold focus:border-cyan-500 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-xl" />
                  Pesan via WhatsApp
                </button>
                <button className="px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all">
                  <FaShoppingCart />
                </button>
              </div>

              {/* Features Info */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <FaShippingFast className="text-2xl text-cyan-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-medium">Gratis Ongkir</p>
                </div>
                <div className="text-center">
                  <FaShieldAlt className="text-2xl text-cyan-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-medium">Garansi Kualitas</p>
                </div>
                <div className="text-center">
                  <FaStar className="text-2xl text-cyan-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-medium">Rating 4.9</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
