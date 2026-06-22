import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaTiktok, FaClock } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Hubungi Kami</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami siap membantu Anda! Hubungi kami melalui channel yang tersedia atau kunjungi toko kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shrink-0">
                  <FaPhone className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Telepon</h3>
                  <p className="text-gray-600 mb-2">Hubungi kami langsung via telepon</p>
                  <a href="tel:+6281234567890" className="text-cyan-600 font-semibold hover:text-cyan-700">
                    +62 812-3456-7890
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Senin - Minggu: 09:00 - 21:00 WIB</p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shrink-0">
                  <FaWhatsapp className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">WhatsApp</h3>
                  <p className="text-gray-600 mb-2">Chat langsung dengan customer service</p>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                  >
                    Chat Sekarang
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600 mb-2">Kirim email untuk pertanyaan detail</p>
                  <a href="mailto:info@jijahboutique.com" className="text-cyan-600 font-semibold hover:text-cyan-700">
                    info@jijahboutique.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Balasan dalam 1x24 jam</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Alamat Toko</h3>
                  <p className="text-gray-600 mb-2">Kunjungi showroom kami</p>
                  <p className="text-gray-700 font-medium">
                    Jl. Fashion Boulevard No. 123<br />
                    Jakarta Selatan, DKI Jakarta 12345
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-cyan-600 font-semibold hover:text-cyan-700"
                  >
                    Lihat di Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map & Operating Hours */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl p-2 shadow-sm overflow-hidden">
              <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-5xl text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Google Maps Location</p>
                  <p className="text-sm text-gray-500 mt-1">Jl. Fashion Boulevard No. 123</p>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-gradient-to-br from-cyan-500 to-teal-500 text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <FaClock className="text-2xl" />
                <h3 className="text-xl font-bold">Jam Operasional</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="font-medium">Senin - Jumat</span>
                  <span className="font-bold">09:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="font-medium">Sabtu</span>
                  <span className="font-bold">09:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Minggu</span>
                  <span className="font-bold">10:00 - 21:00</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white/10 rounded-lg text-sm">
                ⚠️ Tutup pada hari libur nasional
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
              <p className="text-gray-600 mb-4">Ikuti media sosial kami untuk update terbaru</p>
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="flex items-center gap-3 p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl hover:shadow-md transition">
                  <FaInstagram className="text-2xl text-pink-500" />
                  <div>
                    <p className="font-semibold text-gray-800">Instagram</p>
                    <p className="text-xs text-gray-500">@jijahboutique</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition">
                  <FaFacebook className="text-2xl text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Facebook</p>
                    <p className="text-xs text-gray-500">Jijah Boutique</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl hover:shadow-md transition">
                  <FaTiktok className="text-2xl text-gray-800" />
                  <div>
                    <p className="font-semibold text-gray-800">TikTok</p>
                    <p className="text-xs text-gray-500">@jijahboutique</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition">
                  <FaWhatsapp className="text-2xl text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-800">WhatsApp</p>
                    <p className="text-xs text-gray-500">Business</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Butuh Bantuan Segera?</h2>
          <p className="text-lg mb-6 opacity-90">
            Tim customer service kami siap membantu Anda kapan saja!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-cyan-600 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
            >
              Chat WhatsApp
            </a>
            <a
              href="tel:+6281234567890"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold border-2 border-white hover:bg-white hover:text-cyan-600 transition-all"
            >
              Telepon Sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
