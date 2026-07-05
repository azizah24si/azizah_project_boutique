import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaBars, FaTimes, FaPhone, FaWhatsapp, FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Beranda", hash: "#beranda" },
    { name: "Produk", hash: "#produk" },
    { name: "Tentang Kami", hash: "#tentang" },
    { name: "Kontak", hash: "#kontak" },
  ];

  // Intersection Observer untuk mendeteksi section aktif
  useEffect(() => {
    if (location.pathname !== "/guest" && location.pathname !== "/") return;

    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -40% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    let visibleSections = new Map();

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        
        if (entry.isIntersecting) {
          visibleSections.set(sectionId, entry.intersectionRatio);
        } else {
          visibleSections.delete(sectionId);
        }
      });

      // Cari section dengan ratio tertinggi
      let maxRatio = 0;
      let activeId = "beranda";
      
      visibleSections.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeId = id;
        }
      });

      if (maxRatio > 0) {
        setActiveSection(activeId);
        window.history.replaceState(null, "", `#${activeId}`);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["beranda", "produk", "tentang", "kontak"];
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Set initial dari hash
    const hash = location.hash.replace("#", "");
    if (hash && sections.includes(hash)) {
      setActiveSection(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) observer.unobserve(element);
      });
      visibleSections.clear();
    };
  }, [location.pathname, location.hash]);

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    if (location.pathname === "/guest" || location.pathname === "/") {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/guest" + hash);
    }
    setIsOpen(false);
  };

  const isActive = (hash) => {
    if (location.pathname !== "/guest" && location.pathname !== "/") return false;
    return activeSection === hash.replace("#", "");
  };

  return (
    <>
      {/* Top Bar - Info Kontak */}
      <div className="bg-gradient-to-r from-plum-500 to-gold-500 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+6281234567890" className="flex items-center gap-2 hover:text-plum-100 transition">
              <FaPhone className="text-xs" />
              <span className="hidden md:inline">+62 812-3456-7890</span>
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 hover:text-plum-100 transition">
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
              <div className="w-10 h-10 bg-gradient-to-br from-plum-400 to-gold-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaShoppingBag className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-plum-600 to-gold-600 bg-clip-text text-transparent">
                  Jijah Boutique
                </h1>
                <p className="text-xs text-gray-500">Fashion & Style</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.hash}
                  href={link.hash}
                  onClick={(e) => handleNavClick(e, link.hash)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    isActive(link.hash)
                      ? "bg-gradient-to-r from-plum-500 to-gold-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Cart Icon */}
              <Link
                to={user ? "/member/cart" : "/login"}
                className="ml-2 relative p-2 text-gray-700 hover:text-plum-600 transition"
              >
                <FaShoppingCart className="text-2xl" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {/* User / Login */}
              {user ? (
                <div className="ml-2 relative group">
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition">
                    <div className="w-8 h-8 bg-gradient-to-br from-plum-400 to-gold-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {(profile?.full_name || "U").charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[120px] truncate">{profile?.full_name || "Member"}</span>
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      to="/member"
                      className="block px-4 py-3 text-gray-700 hover:bg-plum-50 rounded-t-xl transition"
                    >
                      <FaUser className="inline mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      to="/member/orders"
                      className="block px-4 py-3 text-gray-700 hover:bg-plum-50 transition"
                    >
                      <FaShoppingBag className="inline mr-2" />
                      Pesanan Saya
                    </Link>
                    <Link
                      to="/member/profile"
                      className="block px-4 py-3 text-gray-700 hover:bg-plum-50 transition"
                    >
                      <FaUser className="inline mr-2" />
                      Profil Saya
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={async () => {
                        await signOut();
                        navigate("/guest");
                      }}
                      className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-b-xl transition"
                    >
                      <span className="inline mr-2">🚪</span>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="ml-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:scale-105 transition-all"
                >
                  Login
                </Link>
              )}
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
                <a
                  key={link.hash}
                  href={link.hash}
                  onClick={(e) => handleNavClick(e, link.hash)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all cursor-pointer ${
                    isActive(link.hash)
                      ? "bg-gradient-to-r from-plum-500 to-gold-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              
              <Link
                to={user ? "/member/cart" : "/login"}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all"
              >
                <FaShoppingCart className="inline mr-2" />
                Keranjang ({getTotalItems()})
              </Link>

              {user ? (
                <>
                  <Link
                    to="/member"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    <FaUser className="inline mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/member/orders"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    <FaShoppingBag className="inline mr-2" />
                    Pesanan Saya
                  </Link>
                  <Link
                    to="/member/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    <FaUser className="inline mr-2" />
                    Profil Saya
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block mt-4 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-medium text-center"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
