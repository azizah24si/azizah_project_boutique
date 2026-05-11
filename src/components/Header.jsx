import {
  FaSearch,
  FaBell,
  FaCog,
} from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">

      

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="relative">
          <input
            type="text"
            placeholder="Type here..."
            className="bg-white border border-gray-100 rounded-2xl py-2 pl-10 pr-4 text-sm outline-none w-64 shadow-sm"
          />

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        </div>

        {/* ICON */}
        <button className="text-gray-400 hover:text-cyan-400">
          <FaBell />
        </button>

        <button className="text-gray-400 hover:text-cyan-400">
          <FaCog />
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3">
          <img
            src="https://avatar.iran.liara.run/public/28"
            alt=""
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Admin Boutique
            </h3>

            <p className="text-xs text-gray-400">
              Administrator
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}