import { useState } from "react";
import { FaCalendar, FaClock, FaUser, FaPhone, FaEnvelope, FaComment, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { createReservation } from "../../services/ordersAPI";

export default function Reservation() {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    name: profile?.full_name || "",
    phone: profile?.phone || "",
    email: user?.email || "",
    date: "",
    time: "",
    service: "",
    notes: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reservationNumber, setReservationNumber] = useState("");

  const services = [
    "Konsultasi Fashion",
    "Custom Order",
    "Fitting",
    "Personal Shopping",
    "Styling Session"
  ];

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const reservationData = {
        customerInfo: {
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          user_id: user?.id || null,
        },
        service: formData.service,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
      };

      const order = await createReservation(reservationData);
      
      // Generate reservation number
      const resNumber = `RSV${order.id.substring(0, 8).toUpperCase()}`;
      setReservationNumber(resNumber);
      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: profile?.full_name || "",
          phone: profile?.phone || "",
          email: user?.email || "",
          date: "",
          time: "",
          service: "",
          notes: ""
        });
      }, 5000);
    } catch (error) {
      console.error("Reservation error:", error);
      alert("Gagal membuat reservasi: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl p-12 shadow-xl text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-white text-4xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Reservasi Berhasil!</h2>
          <p className="text-gray-600 mb-6">
            Terima kasih telah melakukan reservasi. Kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi.
          </p>
          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-4 rounded-xl mb-6">
            <p className="text-sm text-gray-700">
              <strong>Nomor Reservasi:</strong> {reservationNumber}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Reservasi Layanan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jadwalkan kunjungan Anda atau konsultasi fashion dengan tim ahli kami. 
            Isi form di bawah dan kami akan segera menghubungi Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Reservasi</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaUser className="inline mr-2 text-cyan-500" />
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaPhone className="inline mr-2 text-cyan-500" />
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition"
                    placeholder="08xx-xxxx-xxxx"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2 text-cyan-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pilih Layanan *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition"
                  >
                    <option value="">Pilih layanan...</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaCalendar className="inline mr-2 text-cyan-500" />
                    Tanggal *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaClock className="inline mr-2 text-cyan-500" />
                    Waktu *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition"
                  >
                    <option value="">Pilih waktu...</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>{slot} WIB</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaComment className="inline mr-2 text-cyan-500" />
                  Catatan Tambahan
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition resize-none"
                  placeholder="Ceritakan kebutuhan Anda..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-lg rounded-xl hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Mengirim..." : "Kirim Reservasi"}
              </button>
            </form>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-cyan-500 to-teal-500 text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <FaPhone className="shrink-0" />
                  <div>
                    <p className="font-semibold">Telepon</p>
                    <a href="tel:+6281234567890">+62 812-3456-7890</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="shrink-0" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:info@jijahboutique.com">info@jijahboutique.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCalendar className="shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Jam Operasional</p>
                    <p>Senin - Minggu</p>
                    <p>09:00 - 21:00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Layanan Tersedia</h3>
              <ul className="space-y-3 text-sm">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full shrink-0"></div>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">💡 Tips Reservasi</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Reservasi minimal H-1 hari sebelumnya</li>
                <li>✓ Konfirmasi via WhatsApp dalam 1x24 jam</li>
                <li>✓ Gratis konsultasi untuk semua layanan</li>
                <li>✓ Bisa reschedule maksimal 4 jam sebelum jadwal</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
