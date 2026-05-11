import { NavLink } from "react-router-dom";
import {
  FaThLarge,
  FaTshirt,
  FaListUl,
  FaUserFriends,
  FaSignOutAlt,
  FaQuestionCircle,
} from "react-icons/fa";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all
    ${
      isActive
        ? "bg-cyan-400 text-white shadow-sm"
        : "text-gray-400 hover:bg-cyan-50 hover:text-cyan-400"
    }`;

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col px-6 py-8">
      {/* LOGO */}
      <div className="mb-10 flex flex-col items-center">
        <img
          src="/img/logojijah.png"
          alt="Jijah Boutique"
          className="w-50 h-30 object-contain"
        />

        <h1 className="text-2xl font-bold text-gray-700 mt-2">
          Jijah<span className="text-cyan-400">Boutique</span>
        </h1>
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-2">
        <NavLink to="/" className={menuClass}>
          <FaThLarge />
          Dashboard
        </NavLink>

        <NavLink to="/product" className={menuClass}>
          <FaTshirt />
          Produk
        </NavLink>

        <NavLink to="/orders" className={menuClass}>
          <FaListUl />
          Penjualan
        </NavLink>

        <NavLink to="/customers" className={menuClass}>
          <FaUserFriends />
          Pelanggan
        </NavLink>
      </div>

      {/* SYSTEM */}
      <div className="mt-10">
        <p className="text-xs text-gray-300 uppercase mb-3 font-semibold">
          System
        </p>

        <div className="flex flex-col gap-2">
          <NavLink to="/400" className={menuClass}>
            400 Bad Request
          </NavLink>

          <NavLink to="/401" className={menuClass}>
            401 Unauthorized
          </NavLink>

          <NavLink to="/403" className={menuClass}>
            403 Forbidden
          </NavLink>
        </div>
      </div>

      {/* HELP CARD */}
      <div className="mt-auto">
        <div className="bg-cyan-400 rounded-3xl p-5 text-white relative overflow-hidden">
          <FaQuestionCircle className="text-3xl mb-3" />

          <h3 className="font-bold text-lg">Need help?</h3>

          <p className="text-sm mt-1 opacity-90">Please check our docs</p>

          <button className="bg-white text-cyan-400 w-full mt-4 py-2 rounded-xl font-semibold text-sm">
            DOCUMENTATION
          </button>
        </div>

        {/* LOGOUT */}
        <button className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-50 text-gray-500 hover:bg-red-500 hover:text-white transition-all">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}
