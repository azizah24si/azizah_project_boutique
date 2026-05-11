import {
  FaShoppingBag,
  FaUsers,
  FaDollarSign,
  FaChartLine,
} from "react-icons/fa";

export default function Dashboard() {

  const cards = [
    {
      title: "Total Produk",
      value: "120",
      percent: "+55%",
      icon: <FaShoppingBag />,
    },
    {
      title: "Total Pelanggan",
      value: "2,300",
      percent: "+5%",
      icon: <FaUsers />,
    },
    {
      title: "Pesanan Baru",
      value: "15",
      percent: "+14%",
      icon: <FaChartLine />,
    },
    {
      title: "Total Sales",
      value: "Rp 5JT",
      percent: "+8%",
      icon: <FaDollarSign />,
    },
  ];

  const orders = [
    {
      id: "#B001",
      produk: "Dress Floral",
      pelanggan: "Aisyah",
      status: "Selesai",
    },
    {
      id: "#B002",
      produk: "Blouse Korean",
      pelanggan: "Nadia",
      status: "Pending",
    },
    {
      id: "#B003",
      produk: "Outer Vintage",
      pelanggan: "Salsa",
      status: "Batal",
    },
  ];

  return (
    <div>
      {/* LEFT */}
      <div>
        <p className="text-sm text-gray-400">
          Pages / Dashboard
        </p>

        <h1 className="text-2xl font-bold text-gray-700">
          Dashboard
        </h1>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-5">

        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-5 shadow-sm"
          >
            <div className="flex justify-between">

              <div>
                <p className="text-sm text-gray-400">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold text-gray-700 mt-1">
                  {item.value}
                </h2>

                <p className="text-green-500 text-sm mt-1">
                  {item.percent}
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-cyan-400 text-white flex items-center justify-center">
                {item.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* BANNER */}
      <div className="grid grid-cols-3 gap-5 mt-5">

        <div className="bg-white rounded-3xl p-6 shadow-sm col-span-2">
          <p className="text-sm text-gray-400">
            Built by developers
          </p>

          <h2 className="text-3xl font-bold text-gray-700 mt-2">
            Azizah Boutique Dashboard
          </h2>

          <p className="text-gray-400 mt-3 max-w-lg">
            Dashboard boutique modern untuk mengelola produk,
            pelanggan, dan transaksi penjualan dengan tampilan elegan.
          </p>

          <button className="mt-6 text-cyan-400 font-semibold">
            Read More →
          </button>
        </div>

        <div className="bg-[url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center rounded-3xl relative overflow-hidden">
          <div className="bg-black/50 w-full h-full p-6 text-white">
            <h2 className="text-2xl font-bold">
              Boutique Fashion
            </h2>

            <p className="mt-3 text-sm leading-relaxed">
              Kelola penjualan fashion boutique lebih mudah dan modern.
            </p>

            <button className="mt-6 font-semibold">
              Read More →
            </button>
          </div>
        </div>

      </div>

      {/* CHART */}
      <div className="grid grid-cols-3 gap-5 mt-5">

        <div className="bg-[#1c2246] rounded-3xl p-6 text-white">
          <h3 className="font-semibold">
            Active Users
          </h3>

          <div className="flex items-end gap-4 h-44 mt-6">

            <div className="w-3 bg-white rounded-full h-24"></div>
            <div className="w-3 bg-white rounded-full h-36"></div>
            <div className="w-3 bg-white rounded-full h-20"></div>
            <div className="w-3 bg-white rounded-full h-40"></div>
            <div className="w-3 bg-white rounded-full h-28"></div>
            <div className="w-3 bg-white rounded-full h-36"></div>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">

            <div>
              <p className="text-sm text-gray-300">
                Users
              </p>

              <h4 className="font-bold text-lg">
                32,984
              </h4>
            </div>

            <div>
              <p className="text-sm text-gray-300">
                Sales
              </p>

              <h4 className="font-bold text-lg">
                2,400$
              </h4>
            </div>

          </div>
        </div>

        {/* SALES */}
        <div className="bg-white rounded-3xl p-6 col-span-2 shadow-sm">

          <h3 className="text-xl font-bold text-gray-700">
            Sales Overview
          </h3>

          <p className="text-green-500 text-sm mt-1">
            (+5%) more in 2025
          </p>

          <div className="mt-10 h-56 relative">

            <svg
              viewBox="0 0 500 200"
              className="w-full h-full"
              fill="none"
            >
              <path
                d="M0 150 C100 50, 200 180, 300 80 C350 30, 420 160, 500 70"
                stroke="#2dd4bf"
                strokeWidth="4"
              />

              <path
                d="M0 120 C100 200, 220 100, 320 170 C400 220, 450 80, 500 140"
                stroke="#1f2937"
                strokeWidth="3"
              />
            </svg>

          </div>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mt-5">

        <h2 className="text-xl font-bold text-gray-700 mb-5">
          Transaksi Terbaru
        </h2>

        <table className="w-full">

          <thead>
            <tr className="text-left text-gray-400 text-sm border-b">
              <th className="pb-4">ID</th>
              <th className="pb-4">Produk</th>
              <th className="pb-4">Pelanggan</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((item) => (
              <tr
                key={item.id}
                className="border-b last:border-none"
              >
                <td className="py-4 font-semibold text-gray-700">
                  {item.id}
                </td>

                <td className="py-4 text-gray-600">
                  {item.produk}
                </td>

                <td className="py-4 text-gray-600">
                  {item.pelanggan}
                </td>

                <td className="py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      item.status === "Selesai"
                        ? "bg-green-100 text-green-500"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}