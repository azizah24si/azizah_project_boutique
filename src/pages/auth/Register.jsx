import { NavLink } from "react-router-dom";
import { FaFacebook, FaApple, FaGoogle, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Register() {
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
              className="w-16 h-16 border border-gray-200 rounded-2xl flex items-center justify-center hover:border-cyan-400 transition"
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm mb-6">or</div>

      <form>
        <div className="space-y-4 mb-6">
          <Input label="Name" type="text" placeholder="Your full name" icon={<FaUser />} required />
          <Input label="Email" type="email" placeholder="Your email address" icon={<FaEnvelope />} required />
          <Input label="Password" type="password" placeholder="Your password" icon={<FaLock />} required />
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input type="checkbox" id="remember-register" className="w-4 h-4 accent-cyan-400 cursor-pointer" />
          <label htmlFor="remember-register" className="text-sm text-gray-500 cursor-pointer">
            Remember me
          </label>
        </div>

        <Button type="submit" className="w-full" size="lg">
          SIGN UP
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
