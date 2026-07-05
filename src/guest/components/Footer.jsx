import { Link } from "react-router-dom";
import { FaShoppingBag, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center">
                <FaShoppingBag className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Jijah Boutique</h3>
                <p className="text-xs text-gray-400">Fashion & Style</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Boutique fashion terpercaya dengan koleksi pakaian trendy dan berkualitas untuk wanita modern.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-400 hover:to-teal-500 transition-all">
                <FaInstagram />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-400 hover:to-teal-500 transition-all">
                <FaFacebook />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-400 hover:to-teal-500 transition-all">
                <FaWhatsapp />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-400 hover:to-teal-500 transition-all">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Menu Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#beranda" className="text-gray-400 hover:text-cyan-400 transition">Beranda</a></li>
              <li><a href="/#produk" className="text-gray-400 hover:text-cyan-400 transition">Produk</a></li>
              <li><a href="/#tentang" className="text-gray-400 hover:text-cyan-400 transition">Tentang Kami</a></li>
              <li><a href="/#kontak" className="text-gray-400 hover:text-cyan-400 transition">Kontak</a></li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-bold text-lg mb-4">Layanan Kami</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">✓ Konsultasi Fashion</li>
              <li className="text-gray-400">✓ Custom Order</li>
              <li className="text-gray-400">✓ Home Service</li>
              <li className="text-gray-400">✓ Reseller Program</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-cyan-400 mt-1 shrink-0" />
                <span>Jl. Fashion Boulevard No. 123<br />Jakarta Selatan, 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-cyan-400 shrink-0" />
                <a href="tel:+6281234567890" className="hover:text-cyan-400 transition">+62 812-3456-7890</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-cyan-400 shrink-0" />
                <a href="mailto:info@jijahboutique.com" className="hover:text-cyan-400 transition">info@jijahboutique.com</a>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white/5 rounded-lg text-xs text-gray-400">
              <strong className="text-white">Jam Operasional:</strong><br />
              Senin - Minggu<br />
              09.00 - 21.00 WIB
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 Jijah Boutique. All rights reserved.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link to="#" className="hover:text-cyan-400 transition">Privacy Policy</Link>
              <Link to="#" className="hover:text-cyan-400 transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
