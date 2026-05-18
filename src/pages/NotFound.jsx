import { Link } from "react-router-dom";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-[#f8f9fb] p-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-lg w-full text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>
        <EmptyState
          icon="🔍"
          title="Halaman Tidak Ditemukan"
          description="Maaf, halaman yang kamu cari tidak ada atau telah dipindahkan."
          action={
            <Link to="/">
              <Button>Kembali ke Dashboard</Button>
            </Link>
          }
        />
      </div>
    </div>
  );
}
