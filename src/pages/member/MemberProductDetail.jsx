import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaShoppingCart, FaWhatsapp, FaShippingFast, FaShieldAlt, FaArrowLeft, FaTag } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import { useToast } from "../../components/Toast";
import { productsAPI } from "../../services/productsAPI";
import Spinner from "../../components/Spinner";

export default function MemberProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { profile } = useAuth();
  const { addToast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  // Member discount berdasarkan level
  const memberDiscounts = {
    Bronze: 0,
    Silver: 0.05,
    Gold: 0.10,
    Platinum: 0.15,
  };

  const memberDiscount = memberDiscounts[profile?.member_level] || 0;

  // Load product from API
  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      console.log("🔍 Loading product with ID:", id);
      
      const data = await productsAPI.getById(id);
      console.log("✅ Product data loaded:", data);
      
      // Transform product data
      const transformedProduct = {
        ...data,
        price: Number(data.price),
        image: data.image_url,
        rating: 4.5 + Math.random() * 0.5,
        reviews: Math.floor(Math.random() * 150) + 50,
        // Default values for fields that might not be in database
        sizes: data.sizes || ["S", "M", "L", "XL"],
        colors: data.colors || [
          { name: "Pink", hex: "#ffc0cb" },
          { name: "Blue", hex: "#87ceeb" },
          { name: "White", hex: "#ffffff" }
        ],
        images: data.images || [data.image_url],
        features: data.features || [
          "Bahan berkualitas premium",
          "Nyaman dipakai",
          "Desain trendy dan elegan",
          "Tersedia berbagai ukuran",
          "Cocok untuk berbagai acara"
        ],
      };
      
      console.log("✅ Transformed product:", transformedProduct);
      setProduct(transformedProduct);
      setSelectedImage(transformedProduct.images[0]);
    } catch (error) {
      console.error("❌ Error loading product:", error);
      console.error("Error details:", error.message, error.stack);
      addToast({
        title: "Error",
        description: "Gagal memuat produk: " + error.message,
        variant: "error",
      });
      navigate("/member/products");
    } finally {
      setLoading(false);
    }
  };

  // Helper to categorize product
  const categorizeProduct = (product) => {
    const name = product.name.toLowerCase();
    const desc = (product.description || "").toLowerCase();
    const text = name + " " + desc;

    if (text.includes("dress")) return "Dress Collection";
    if (text.includes("blouse") || text.includes("blus") || text.includes("top") || text.includes("shirt")) return "Blouse Collection";
    if (text.includes("outer") || text.includes("blazer") || text.includes("cardigan") || text.includes("jacket")) return "Outer Collection";
    if (text.includes("hijab") || text.includes("pashmina") || text.includes("voal")) return "Hijab Collection";
    return "Fashion Collection";
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;
    
    const discountedPrice = product.price - (product.price * memberDiscount);
    const message = `Halo, saya tertarik dengan produk:\n\nNama: ${product.name}\nHarga: ${formatRupiah(discountedPrice)}\nUkuran: ${selectedSize}\nJumlah: ${quantity}\n\nApakah produk ini tersedia?`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const discountedPrice = product.price - (product.price * memberDiscount);
    
    if (!selectedSize) {
      addToast({
        title: "Pilih ukuran!",
        description: "Silakan pilih ukuran terlebih dahulu",
        variant: "warning",
      });
      return;
    }

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: discountedPrice,
        image: product.images[0],
        category: product.category || categorizeProduct(product),
      },
      quantity,
      selectedSize,
      ""
    );
    
    addToast({
      title: "Berhasil ditambahkan!",
      description: `${product.name} (${quantity}x) telah ditambahkan ke keranjang`,
      variant: "success",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h3>
          <p className="text-gray-600 mb-6">Maaf, produk yang Anda cari tidak ditemukan.</p>
          <button
            onClick={() => navigate("/member/products")}
            className="px-6 py-3 bg-gradient-to-r from-plum-500 to-gold-500 text-white rounded-xl font-semibold hover:shadow-lg transition"
          >
            Kembali ke Produk
          </button>
        </div>
      </div>
    );
  }

  const category = product.category || categorizeProduct(product);
  const discountedPrice = product.price - (product.price * memberDiscount);
  const savings = product.price * memberDiscount;

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/member/products")}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-plum-600 transition"
      >
        <FaArrowLeft />
        <span className="font-medium">Kembali ke Produk</span>
      </button>

      {/* Member Discount Banner */}
      {memberDiscount > 0 && (
        <div className="bg-gradient-to-r from-plum-500 to-gold-500 rounded-2xl p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaTag className="text-2xl" />
            <div>
              <p className="font-bold text-lg">Member {profile?.member_level} Discount</p>
              <p className="text-plum-100 text-sm">Hemat {(memberDiscount * 100).toFixed(0)}% untuk produk ini</p>
            </div>
          </div>
          <Badge variant="white" className="text-plum-600 font-bold text-lg">
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
                    ? "border-plum-500"
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
                <p className="text-sm text-plum-600 font-semibold mb-2">{category}</p>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-bold text-gray-800">{product.rating?.toFixed(1) || "4.5"}</span>
                  </div>
                  <span className="text-gray-500">({product.reviews || 0} ulasan)</span>
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
                    <span className="text-4xl font-bold text-plum-600">
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
                ✓ Stok tersedia: {product.stock || 0} pcs
              </p>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Deskripsi</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description || "Produk berkualitas tinggi dengan desain trendy dan elegan."}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">Keunggulan Produk</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-plum-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
                        ? "bg-gradient-to-r from-plum-500 to-gold-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
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
                  className="w-20 h-10 text-center border-2 border-gray-200 rounded-lg font-bold focus:border-plum-500 focus:outline-none"
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
                <FaShippingFast className="text-2xl text-plum-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-medium">Gratis Ongkir</p>
              </div>
              <div className="text-center">
                <FaShieldAlt className="text-2xl text-plum-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-medium">Garansi Kualitas</p>
              </div>
              <div className="text-center">
                <FaStar className="text-2xl text-plum-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-medium">Rating {product.rating?.toFixed(1) || "4.5"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
