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
    description: "Dress cantik dengan motif floral warna pink yang cocok untuk acara casual maupun semi-formal.",
    material: "Cotton Premium",
    size: ["S", "M", "L", "XL"],
    color: ["Pink", "White", "Lavender"],
  };

  return (
    <div className="p-4">
      <PageHeader title="Detail Produk" breadcrumb={["Dashboard", "Produk", product.name]}>
        <button
          onClick={() => navigate("/product")}
          className="bg-gray-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-gray-600"
        >
          ← Kembali
        </button>
      </PageHeader>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-500 text-sm">ID: {product.id}</p>
          </div>
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-bold">
            {product.category}
          </span>
        </div>

        <p className="text-2xl font-bold text-pink-600 mb-3">{product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-500 text-sm">Stok</p>
            <p className="font-bold">{product.stock} Unit</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Material</p>
            <p className="font-bold">{product.material}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Ukuran</p>
            <p className="font-bold">{product.size.join(", ")}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Warna</p>
            <p className="font-bold">{product.color.join(", ")}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-pink-500 text-white py-2 rounded-lg font-bold hover:bg-pink-600">
            Edit
          </button>
          <button className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
