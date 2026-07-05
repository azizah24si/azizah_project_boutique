import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { FaHome, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-plum-50 to-gold-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-plum-500 to-gold-500 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-2xl font-semibold text-gray-800 mt-4 mb-2">
            Halaman Tidak Ditemukan
          </p>
          <p className="text-gray-600 max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin sudah dipindahkan atau tidak pernah ada.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            variant="primary"
            icon={<FaHome />}
            onClick={() => navigate("/")}
          >
            Kembali ke Beranda
          </Button>
          <Button
            variant="secondary"
            icon={<FaArrowLeft />}
            onClick={() => navigate(-1)}
          >
            Halaman Sebelumnya
          </Button>
        </div>

        <div className="mt-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
            alt="404 Not Found"
            className="w-64 h-64 mx-auto opacity-50"
          />
        </div>
      </div>
    </div>
  );
}
