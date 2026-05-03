import { FaBell, FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4">

      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Cari outfit..."
          className="border p-2 pr-10 bg-white w-full rounded-md shadow-sm"
        />
        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="p-3 bg-pink-100 rounded-2xl text-pink-500">
          <FaBell />
        </div>

        <div className="flex items-center space-x-4 border-l pl-4">
          <span>
            Hello, <b>Admin Boutique</b>
          </span>
          <img
            src="https://avatar.iran.liara.run/public/28"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}