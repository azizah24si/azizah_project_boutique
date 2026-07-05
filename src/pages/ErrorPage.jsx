import { Link } from "react-router-dom";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function ErrorPage({ code, description, image }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 bg-[#f8f9fb]">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-lg w-full">
        <img src={image} alt="Error Illustration" className="w-64 mx-auto mb-6" />
        <h1 className="text-7xl font-black text-plum-400">{code}</h1>
        <p className="text-2xl font-bold text-gray-700 mt-4">{description}</p>

        <div className="mt-6">
          <Alert variant="warning">
            Terjadi kendala pada sistem boutique. Silakan coba lagi atau kembali ke dashboard.
          </Alert>
        </div>

        <div className="mt-6">
          <Link to="/">
            <Button size="lg">Kembali ke Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
