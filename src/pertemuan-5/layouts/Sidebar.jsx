import { FaThLarge, FaListUl, FaUserFriends, FaPlus, FaSignOutAlt } 
from "react-icons/fa";

export default function Sidebar() {
  return (
    <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span className="block text-[36px] font-[900] text-gray-900 leading-none tracking-tight font-poppins">
          Sedap <b id="logo-dot" className="text-hijau">.</b>
        </span>
        <span id="logo-subtitle" className="font-semibold text-gray-400 font-barlow">
          Modern Admin Dashboard
        </span>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          <li>
            <div id="menu-1" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-100 hover:font-extrabold transition-all">
              <FaThLarge className="mr-4 text-xl" /> Dashboard
            </div>
          </li>
          <li>
            <div id="menu-2" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-100 hover:font-extrabold transition-all">
              <FaListUl className="mr-4 text-xl" /> Orders
            </div>
          </li>
          <li>
            <div id="menu-3" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-100 hover:font-extrabold transition-all">
              <FaUserFriends className="mr-4 text-xl" /> Customers
            </div>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto">
        <div id="footer-card" className="bg-hijau px-4 py-4 rounded-2xl shadow-lg mb-10 flex items-center justify-between relative overflow-hidden">
          <div id="footer-text" className="text-white text-sm z-10">
            <p className="w-2/3">Please organize your menus through button below!</p>
            <div id="add-menu-button" className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2 cursor-pointer">
              <span className="text-gray-600 font-bold flex items-center">
                <FaPlus className="mr-2" /> Add Menus
              </span>
            </div>
          </div>
          <img 
            id="footer-avatar" 
            src="https://avatar.iran.liara.run/public/28" 
            className="w-16 h-16 rounded-full absolute -right-2 bottom-4 opacity-80" 
          />
        </div>

        {/* IMPROVISASI 3: Penambahan Fitur Navigasi Logout System */}
        <button className="w-full flex items-center justify-center space-x-3 p-3 mb-6 bg-red-50 
        text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 font-bold group shadow-sm">
          <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform text-lg" />
          <span>Logout</span>
        </button>

        <span id="footer-brand" className="font-bold text-gray-400 block">Sedap Restaurant Admin Dashboard</span>
        <p id="footer-copyright" className="font-light text-gray-400">© 2025 All Right Reserved</p>
      </div>
    </div>
  );
}