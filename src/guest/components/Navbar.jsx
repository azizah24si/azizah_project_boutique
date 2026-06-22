import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingBag, FaBars, FaTimes, FaPhone, FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Beranda", path: "/guest" },
    { name: "Produk", path: "/guest/products" },
    { name: "Reservasi", path: "/guest/reservation" },
    { name: "Galeri", path: "/guest/gallery" },
    { name: "Tentang Kami", path: "/guest/about" },
    { name: "Kontak", path: "/guest/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Bar - Info Kontak */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+6281234567890" className="flex items-center gap-2 hover:text-cyan-100 transition">
              <FaPhone className="text-xs" />
              <span className="hidden md:inline">+62 812-3456-7890</span>
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 hover:text-cyan-100 transition">
              <FaWhatsapp />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
          </div>
          <div className="text-xs hidden md:block">
            Buka Setiap Hari: 09.00 - 21.00 WIB
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/guest" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaShoppingBag className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  Jijah Boutique
                </h1>
                <p className="text-xs text-gray-500">Fashion & Style</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/login"
                className="ml-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:scale-105 transition-all"
              >
                Admin Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 text-2xl"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block mt-4 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-medium text-center"
              >
                Admin Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
