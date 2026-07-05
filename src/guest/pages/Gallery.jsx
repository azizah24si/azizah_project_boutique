import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ["Semua", "Dress", "Blouse", "Outer", "Hijab", "Events"];
  const [activeCategory, setActiveCategory] = useState("Semua");

  const images = [
    { id: 1, category: "Dress", url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop", title: "Floral Dress Collection" },
    { id: 2, category: "Blouse", url: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=800&fit=crop", title: "Korean Style Blouse" },
    { id: 3, category: "Outer", url: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=800&fit=crop", title: "Vintage Outer" },
    { id: 4, category: "Hijab", url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=800&fit=crop", title: "Hijab Pashmina" },
    { id: 5, category: "Dress", url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop", title: "Maxi Dress Elegant" },
    { id: 6, category: "Events", url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=800&fit=crop", title: "Store Opening Event" },
    { id: 7, category: "Blouse", url: "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=600&h=800&fit=crop", title: "Office Blouse" },
    { id: 8, category: "Outer", url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop", title: "Blazer Premium" },
    { id: 9, category: "Events", url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop", title: "Fashion Show 2024" },
    { id: 10, category: "Hijab", url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=800&fit=crop", title: "Segi Empat Collection" },
    { id: 11, category: "Dress", url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop", title: "Evening Dress" },
    { id: 12, category: "Events", url: "https://images.unsplash.com/photo-1558769132-cb1aea1c8588?w=600&h=800&fit=crop", title: "Customer Gathering" },
  ];

  const filteredImages = activeCategory === "Semua" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Galeri</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jelajahi koleksi produk dan momen spesial kami
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeCategory === category
                  ? "bg-gradient-to-r from-plum-500 to-gold-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="group relative aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold">{image.title}</p>
                  <p className="text-plum-300 text-sm">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Tidak ada gambar di kategori ini</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div onClick={(e) => e.stopPropagation()} className="max-w-5xl max-h-[90vh]">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl"
            />
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4 text-white text-center">
              <h3 className="text-xl font-bold mb-1">{selectedImage.title}</h3>
              <p className="text-plum-300">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
