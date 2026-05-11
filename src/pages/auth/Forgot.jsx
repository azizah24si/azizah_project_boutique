export default function Forgot() {
  return (
    <div>

      <h2 className="text-3xl font-bold text-center text-gray-700">
        Forgot Password
      </h2>

      <p className="text-center text-gray-400 mt-2 mb-8">
        Enter your email to reset your password
      </p>

      <form>

        <div className="mb-6">

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Your email address"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
          />

        </div>

        <button
          type="submit"
          className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 rounded-2xl transition"
        >
          SEND RESET LINK
        </button>

      </form>

    </div>
  );
}