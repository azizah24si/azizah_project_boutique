import React, { useState } from "react"; // HARUS IMPORT useState
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaUtensils } 
from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    // IMPROVISASI 1: State untuk filter waktu (Daily, Weekly, Monthly)
    const [filter, setFilter] = useState("Weekly");

    // IMPROVISASI 2: Data dummy untuk tabel pesanan terbaru
    const recentOrders = [
        { id: "#00121", menu: "Chicken Teriyaki", customer: "Ahmad", status: "Completed", color: "text-green-500" },
        { id: "#00122", menu: "Beef Burger", customer: "Siti", status: "Pending", color: "text-yellow-500" },
        { id: "#00123", menu: "Fresh Salad", customer: "Budi", status: "Canceled", color: "text-red-500" },
    ];

    return (
        <div id="dashboard-container" className="p-2">
            {/* Header Area dengan Filter Button */}
            <div className="flex justify-between items-center pr-5">
                <PageHeader />
                
                {/* IMPROVISASI 1 (Visual): Button Group Filter */}
                <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 h-fit">
                    {["Daily", "Weekly", "Monthly"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                                filter === item 
                                ? "bg-hijau text-white shadow-md" 
                                : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Card Statistik */}
            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6">
                    <div className="bg-hijau rounded-full p-4 text-3xl text-white"><FaShoppingCart /></div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-800">75</span>
                        <span className="text-gray-400 text-sm">Total Orders</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6">
                    <div className="bg-biru rounded-full p-4 text-3xl text-white"><FaTruck /></div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-800">175</span>
                        <span className="text-gray-400 text-sm">Total Delivered</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6">
                    <div className="bg-merah rounded-full p-4 text-3xl text-white opacity-80"><FaBan /></div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-800">40</span>
                        <span className="text-gray-400 text-sm">Total Canceled</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6">
                    <div className="bg-kuning rounded-full p-4 text-3xl text-white"><FaDollarSign /></div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-800">Rp.128</span>
                        <span className="text-gray-400 text-sm">Total Revenue</span>
                    </div>
                </div>
            </div>

            {/* IMPROVISASI 2 (Visual): Recent Orders Table */}
            <div className="mx-5 mt-2 p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
                    <button className="text-hijau font-bold text-sm hover:underline">View All</button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-400 text-sm border-b border-gray-50">
                                <th className="pb-4 font-medium">Order ID</th>
                                <th className="pb-4 font-medium">Menu</th>
                                <th className="pb-4 font-medium">Customer</th>
                                <th className="pb-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {recentOrders.map((order, index) => (
                                <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 font-bold text-gray-700">{order.id}</td>
                                    <td className="py-4 flex items-center gap-3">
                                        <div className="p-2 bg-green-50 text-hijau rounded-lg"><FaUtensils /></div>
                                        {order.menu}
                                    </td>
                                    <td className="py-4 text-gray-600">{order.customer}</td>
                                    <td className={`py-4 font-bold ${order.color}`}>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}