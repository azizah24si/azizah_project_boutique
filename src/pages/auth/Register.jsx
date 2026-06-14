import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebook, FaApple, FaGoogle, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { usersAPI } from "../../services/usersAPI";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      // Cek apakah email sudah terdaftar
      const existingUsers = await usersAPI.checkEmail(formData.email);

      if (existingUsers.length > 0) {
        setError("Email sudah terdaftar!");
        setLoading(false);
        return;
      }

      // Register user baru
      await usersAPI.createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Registrasi berhasil
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      // Tampilkan error lebih detail
      const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan. Silakan coba lagi.";
      setError(errorMessage);
      console.error("Register error:", err);
      console.error("Error response:", err.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Welcome!</h2>
      <p className="text-gray-400 text-sm mb-6">
        Use these awesome forms to login or create new account in your project for free.
      </p>

      {/* SOCIAL BUTTONS */}
      <div className="mb-6">
        <p className="text-center text-gray-500 text-sm font-medium mb-4">Register with</p>
        <div className="flex gap-3 justify-center">
          {[
            { icon: <FaFacebook className="text-xl text-gray-600" /> },
            { icon: <FaApple className="text-xl text-gray-600" /> },
            { icon: <FaGoogle className="text-xl text-gray-600" /> },
          ].map((item, i) => (
            <button
              key={i}
              type="button"
              className="w-16 h-16 border border-gray-200 rounded-2xl flex items-center justify-center hover:border-cyan-400 transition"
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm mb-6">or</div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Your full name"
            icon={<FaUser />}
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <input type="checkbox" id="remember-register" className="w-4 h-4 accent-cyan-400 cursor-pointer" />
          <label htmlFor="remember-register" className="text-sm text-gray-500 cursor-pointer">
            Remember me
          </label>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Loading..." : "SIGN UP"}
        </Button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-6">
        Already have an account?{" "}
        <NavLink to="/login" className="text-cyan-400 font-semibold hover:underline">
          Sign in
        </NavLink>
      </p>
    </div>
  );
}
