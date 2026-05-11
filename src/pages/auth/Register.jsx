import { NavLink } from "react-router-dom";

export default function Register() {
  return (
    <div>

      <h2 className="text-3xl font-bold text-center text-gray-700">
        Create Account
      </h2>

      <p className="text-center text-gray-400 mt-2 mb-8">
        Register your boutique account
      </p>

      <form>

        {/* EMAIL */}
        <div className="mb-5">

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Your email address"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-5">

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Your password"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
          />

        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-5">

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
          />

        </div>

        {/* REMEMBER */}
        <div className="flex items-center gap-2 mb-6">

          <input
            type="checkbox"
            className="accent-cyan-400"
          />

          <p className="text-sm text-gray-500">
            Remember me
          </p>

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 rounded-2xl transition"
        >
          SIGN UP
        </button>

      </form>

      {/* LOGIN LINK */}
      <p className="text-center text-gray-400 text-sm mt-6">
        Already have an account?

        <NavLink
          to="/login"
          className="text-cyan-400 font-semibold ml-1 hover:underline"
        >
          Sign In
        </NavLink>

      </p>

    </div>
  );
}