import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebook, FaApple, FaGoogle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { supabase } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("📝 Attempting registration with:", formData.email);
      
      // Register via Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
        },
      });

      console.log("📥 Registration response:", { data, signUpError });

      if (signUpError) {
        console.error("❌ Register error:", signUpError);
        if (signUpError.message.includes("already registered")) {
          setError("Email sudah terdaftar!");
        } else {
          setError(signUpError.message);
        }
      } else if (data.user) {
        console.log("✅ User registered:", data.user);
        // Registrasi berhasil
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      } else {
        console.warn("⚠️ No user returned, might need email confirmation");
        alert("Registrasi berhasil! Cek email untuk konfirmasi.");
        navigate("/login");
      }
    } catch (err) {
      console.error("💥 Unexpected error:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP GRADIENT SECTION */}
      <div className="relative bg-gradient-to-br from-plum-400 via-gold-400 to-plum-500 py-12">
        {/* Decorative diagonal lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-10 left-10 w-96 h-96 border-2 border-white rounded-full transform -translate-x-20 -translate-y-20"></div>
            <div className="absolute top-20 right-20 w-64 h-64 border-2 border-white rounded-full transform translate-x-10"></div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-3">Selamat Datang!</h1>
          <p className="text-plum-50 max-w-md mx-auto">
            Daftar sekarang dan nikmati koleksi fashion terbaru dengan sistem membership dan diskon eksklusif!
          </p>
        </div>
      </div>

      {/* FORM CONTAINER - No overlap, just normal flow */}
      <div className="flex justify-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          {/* SOCIAL BUTTONS */}
          <div className="mb-6">
            <p className="text-center text-gray-600 text-sm font-semibold mb-4">Daftar dengan</p>
            <div className="flex gap-4 justify-center">
              {[
                { icon: <FaFacebook className="text-2xl" />, color: "text-gray-700" },
                { icon: <FaApple className="text-2xl" />, color: "text-gray-700" },
                { icon: <FaGoogle className="text-2xl" />, color: "text-gray-700" },
              ].map((item, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition"
                >
                  <span className={item.color}>{item.icon}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm mb-6">atau</div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-5">
              {/* Name Input */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Masukkan nama lengkap Anda"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-plum-400 focus:bg-white transition text-gray-700"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Masukkan email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-plum-400 focus:bg-white transition text-gray-700"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Masukkan password Anda"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-plum-400 focus:bg-white transition text-gray-700"
                />
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center gap-3 mb-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-plum-400 peer-checked:to-gold-400"></div>
              </label>
              <span className="text-sm text-gray-600">Ingat saya</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-plum-400 to-gold-400 text-white font-bold rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm tracking-wide"
            >
              {loading ? "Memproses..." : "DAFTAR SEKARANG"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Sudah punya akun?{" "}
            <NavLink to="/login" className="text-plum-400 font-semibold hover:underline">
              Login di sini
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
