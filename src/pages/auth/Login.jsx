import { NavLink } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Login() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-10">
      <h2 className="text-3xl font-bold text-cyan-400 mb-2">Welcome Back</h2>
      <p className="text-gray-400 mb-8">Enter your email and password to sign in</p>

      <form>
        <div className="space-y-5 mb-6">
          <Input
            label="Email"
            type="email"
            placeholder="Your email address"
            icon={<FaEnvelope />}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            icon={<FaLock />}
            required
          />
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input type="checkbox" id="remember" className="w-4 h-4 accent-cyan-400 cursor-pointer" />
          <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer">
            Remember me
          </label>
        </div>

        <Button type="submit" className="w-full" size="lg">
          SIGN IN
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
