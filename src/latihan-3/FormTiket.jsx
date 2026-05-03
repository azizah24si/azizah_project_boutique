import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function FormTiket() {
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [kelas, setKelas] = useState("");

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const validate = () => {
    let err = {};

    if (!nama) err.nama = "Nama wajib diisi";
    else if (!isNaN(nama)) err.nama = "Nama tidak boleh angka";

    if (!umur) err.umur = "Umur wajib diisi";
    else if (umur < 17) err.umur = "Minimal umur 17 tahun";

    if (!jumlah) err.jumlah = "Jumlah tiket wajib diisi";

    if (!tujuan) err.tujuan = "Pilih tujuan";

    if (!kelas) err.kelas = "Pilih kelas";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    setTouched(true);
    if (validate()) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        
        {/* HEADER */}
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Form Pemesanan Tiket
        </h2>

        {/* FORM */}
        <InputField
          label="Nama"
          type="text"
          placeholder="Masukkan nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          error={errors.nama}
        />

        <InputField
          label="Umur"
          type="number"
          placeholder="Masukkan umur"
          value={umur}
          onChange={(e) => setUmur(e.target.value)}
          error={errors.umur}
        />

        <InputField
          label="Jumlah Tiket"
          type="number"
          placeholder="Jumlah tiket"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
          error={errors.jumlah}
        />

        <SelectField
          label="Tujuan"
          value={tujuan}
          onChange={(e) => setTujuan(e.target.value)}
          options={["Jakarta", "Bandung", "Surabaya"]}
          error={errors.tujuan}
        />

        <SelectField
          label="Kelas"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          options={["Ekonomi", "Bisnis", "Eksekutif"]}
          error={errors.kelas}
        />

        {/* BUTTON */}
        {nama && umur && jumlah && tujuan && kelas && (
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4 transition duration-200"
          >
            Submit
          </button>
        )}

        {/* CONDITIONAL RENDERING */}
        {touched && (
          !submitted ? (
            <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-semibold text-sm">
                Data belum valid, periksa kembali input kamu.
              </p>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded">
              <p><b>Nama:</b> {nama}</p>
              <p><b>Umur:</b> {umur}</p>
              <p><b>Jumlah:</b> {jumlah}</p>
              <p><b>Tujuan:</b> {tujuan}</p>
              <p><b>Kelas:</b> {kelas}</p>
            </div>
          )
        )}

      </div>
    </div>
  );
}