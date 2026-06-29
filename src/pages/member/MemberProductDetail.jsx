import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaShoppingCart, FaWhatsapp, FaShippingFast, FaShieldAlt, FaArrowLeft, FaTag } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import { useToast } from "../../components/Toast";

export default function MemberProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { profile } = useAuth();
  const { addToast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Member discount berdasarkan level
  const memberDiscounts = {
    Bronze: 0,
    Silver: 0.05,
    Gold: 0.10,
    Platinum: 0.15,
  };

  const memberDiscount = memberDiscounts[profile?.member_level] || 0;

  // Mock product data (in real app, fetch from API/database)
  const allProducts = [
    {
      id: "1",
      name: "Dress Floral Premium",
      category: "Dress Collection",
      price: 459000,
      originalPrice: 599000,
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
    },
    {
      id: "2",
      name: "Korean Style Blouse",
      category: "Blouse Collection",
      price: 289000,
      originalPrice: 349000,
      rating: 4.8,
      reviews: 95,
      stock: 23,
      description: "Blouse bergaya Korea dengan desain modern dan elegan. Cocok untuk ke kantor atau acara casual.",
      features: [
        "Desain Korean style trendy",
        "Bahan chiffon premium",
        "Potongan yang flattering",
        "Detail kancing depan",
        "Warna-warna soft dan elegan"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Cream", hex: "#fffdd0" },
        { name: "Sage", hex: "#b2ac88" },
        { name: "Dusty Pink", hex: "#dcb1a0" }
      ],
      images: [
        "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=800&fit=crop",
        "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=600&h=800&fit=crop"
      ]
    },
    {
      id: "3",
      name: "Vintage Outer Premium",
      category: "Outer Collection",
      price: 399000,
      originalPrice: 499000,
      rating: 4.9,
      reviews: 86,
      stock: 12,
      description: "Outer premium dengan sentuhan vintage yang timeless. Sempurna untuk melengkapi outfit Anda.",
      features: [
        "Bahan berkualitas tinggi",
        "Desain vintage elegan",
        "Cocok untuk berbagai outfit",
        "Keeping warm dan stylish",
        "Jahitan rapi dan kuat"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Camel", hex: "#c19a6b" },
        { name: "Black", hex: "#000000" },
        { name: "Olive", hex: "#808000" }
      ],
      images: [
        "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=800&fit=crop"
      ]
    },
  ];

  const product = allProducts.find(p => p.id === id) || allProducts[0];
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // Calculate discounted price
  const discountedPrice = product.price - (product.price * memberDiscount);
  const savings = product.price * memberDiscount;

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleWhatsAppOrder = () => {
    const message = `Halo, saya tertarik dengan produk:\n\nNama: ${product.name}\nHarga: ${formatRupiah(discountedPrice)}\nUkuran: ${selectedSize}\nWarna: ${selectedColor}\nJumlah: ${quantity}\n\nApakah produk ini tersedia?`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast({
        title: "Pilih ukuran!",
        description: "Silakan pilih ukuran terlebih dahulu",
        variant: "warning",
      });
      return;
    }
    if (!selectedColor) {
      addToast({
        title: "Pilih warna!",
        description: "Silakan pilih warna terlebih dahulu",
        variant: "warning",
      });
      return;
    }

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      },
      quantity,
      selectedSize,
      selectedColor
    );
    
    addToast({
      title: "Berhasil ditambahkan!",
      description: `${product.name} (${quantity}x) telah ditambahkan ke keranjang`,
      variant: "success",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/member/products")}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition"
      >
        <FaArrowLeft />
        <span className="font-medium">Kembali ke Produk</span>
      </button>

      {/* Member Discount Banner */}
      {memberDiscount > 0 && (
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaTag className="text-2xl" />
            <div>
              <p className="font-bold text-lg">Member {profile?.member_level} Discount</p>
              <p className="text-cyan-100 text-sm">Hemat {(memberDiscount * 100).toFixed(0)}% untuk produk ini</p>
            </div>
          </div>
          <Badge variant="white" className="text-cyan-600 font-bold text-lg">
            -{(memberDiscount * 100).toFixed(0)}%
          </Badge>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

            {/* Price with Member Discount */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              {memberDiscount > 0 ? (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-400 line-through">
                      {formatRupiah(product.price)}
                    </span>
                    <Badge variant="red" className="font-bold">
                      Member {(memberDiscount * 100).toFixed(0)}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl font-bold text-cyan-600">
                      {formatRupiah(discountedPrice)}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 font-bold">
                    🎉 Anda Hemat {formatRupiah(savings)}!
                  </p>
                </div>
              ) : (
                <span className="text-4xl font-bold text-gray-800">
                  {formatRupiah(product.price)}
                </span>
              )}
              <p className="text-sm text-green-600 font-semibold mt-2">
                ✓ Stok tersedia: {product.stock} pcs
              </p>
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
              <Button
                onClick={handleAddToCart}
                variant="gradient"
                className="flex-1"
                icon={<FaShoppingCart />}
              >
                Tambah ke Keranjang
              </Button>
              <button
                onClick={handleWhatsAppOrder}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all"
              >
                <FaWhatsapp className="text-xl" />
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
                <p className="text-xs text-gray-600 font-medium">Rating {product.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
