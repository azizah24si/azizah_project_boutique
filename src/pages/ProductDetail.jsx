import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = {
    id: id || "PRD-1",
    name: "Dress Floral Pink",
    category: "Dress",
    price: "Rp 150.000",
    stock: 25,
    description:
      "Dress cantik dengan motif floral warna pink yang cocok untuk acara casual maupun semi-formal.",
    material: "Cotton Premium",
    size: ["S", "M", "L", "XL"],
    color: ["Pink", "White", "Lavender"],
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">

      <PageHeader
        title="Detail Produk"
        breadcrumb={["Dashboard", "Produk", product.name]}
      >

        <button
          onClick={() => navigate("/product")}
          className="bg-gray-500 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-gray-600 transition"
        >
          ← Kembali
        </button>

      </PageHeader>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">

          <div>
            <h2 className="text-3xl font-bold text-gray-700">
              {product.name}
            </h2>

            <p className="text-gray-400 mt-1">
              ID: {product.id}
            </p>
          </div>

          <span className="bg-cyan-100 text-cyan-500 px-4 py-2 rounded-full text-sm font-semibold">
            {product.category}
          </span>

        </div>

        {/* PRICE */}
        <p className="text-3xl font-bold text-cyan-500 mb-4">
          {product.price}
        </p>

        {/* DESCRIPTION */}
        <p className="text-gray-500 leading-relaxed mb-8">
          {product.description}
        </p>

        {/* DETAIL */}
        <div className="grid grid-cols-2 gap-5 mb-8">

          <div className="bg-gray-50 p-5 rounded-2xl">
            <p className="text-sm text-gray-400 mb-1">
              Stok
            </p>

            <p className="font-semibold text-gray-700">
              {product.stock} Unit
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-2xl">
            <p className="text-sm text-gray-400 mb-1">
              Material
            </p>

            <p className="font-semibold text-gray-700">
              {product.material}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-2xl">
            <p className="text-sm text-gray-400 mb-1">
              Ukuran
            </p>

            <p className="font-semibold text-gray-700">
              {product.size.join(", ")}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-2xl">
            <p className="text-sm text-gray-400 mb-1">
              Warna
            </p>

            <p className="font-semibold text-gray-700">
              {product.color.join(", ")}
            </p>
          </div>

        </div>

        {/* BUTTON */}
        <div className="flex gap-4">

          <button className="flex-1 bg-cyan-400 text-white py-3 rounded-2xl font-semibold hover:bg-cyan-500 transition">
            Edit
          </button>

          <button className="flex-1 bg-red-400 text-white py-3 rounded-2xl font-semibold hover:bg-red-500 transition">
            Hapus
          </button>

        </div>

      </div>

    </div>
  );
}