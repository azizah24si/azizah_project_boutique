import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { supabase } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("🔐 Attempting login with:", formData.email);
      
      // Login via Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      console.log("📥 Login response:", { data, authError });

      if (authError) {
        console.error("❌ Login error:", authError);
        setError(`Email atau password salah! (${authError.message})`);
      } else if (data.user) {
        console.log("✅ User logged in:", data.user.email);
        
        // Cek role user dari profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        console.log("👤 User profile:", { profile, profileError });

        if (profileError) {
          console.error("❌ Profile fetch error:", profileError);
          setError("Gagal mengambil data profil. Silakan coba lagi.");
          return;
        }

        // Redirect berdasarkan role
        console.log("🚀 Redirecting to:", profile?.role);
        
        if (!profile) {
          setError("Profile tidak ditemukan. Silakan hubungi administrator.");
          return;
        }
        
        if (profile.role === "admin") {
          console.log("✅ Admin detected, redirecting to /admin");
          navigate("/admin");
        } else if (profile.role === "member") {
          console.log("✅ Member detected, redirecting to /member");
          navigate("/member");
        } else {
          console.log("⚠️ Unknown role:", profile.role);
          navigate("/guest/home");
        }
      }
    } catch (err) {
      console.error("💥 Unexpected error:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-10">
      <h2 className="text-3xl font-bold text-cyan-400 mb-2">Selamat Datang Kembali!</h2>
      <p className="text-gray-400 mb-8">Login untuk melanjutkan belanja di Jijah Boutique</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-5 mb-6">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Your email address"
            icon={<FaEnvelope />}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Your password"
            icon={<FaLock />}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input type="checkbox" id="remember" className="w-4 h-4 accent-cyan-400 cursor-pointer" />
          <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer">
            Remember me
          </label>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Loading..." : "SIGN IN"}
        </Button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-6">
        Don't have an account?{" "}
        <NavLink to="/register" className="text-cyan-400 font-semibold hover:underline">
          Sign up
        </NavLink>
      </p>
    </div>
  );
}
