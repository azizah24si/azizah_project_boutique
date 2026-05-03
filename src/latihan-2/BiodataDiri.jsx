export default function BiodataDiri() {
  return (
    <div className="biodata-container">
      <h1>Biodataku</h1>
      <p>Hallo semua!!</p>
      <div className="biodata-card">
        <NamaLengkap />
        <Umur />
        <Jurusan />
        <Kampus />
        <Hobi />
        <CitaCita />
      </div>
    </div>
  );
}

// Child Components
function NamaLengkap() {
  return <p>Namaku Azizah Arshadini</p>;
}

function Umur() {
  return <p>Umur 20 Tahun</p>;
}

function Jurusan() {
  return <p>Jurusan Sistem Informasi</p>;
}

function Kampus() {
  return <p>Berkuliah di Politeknik Caltex Riau</p>;
}

function Hobi() {
  return <p>Hobiku menonton film</p>;
}

function CitaCita() {
  return <p>Aku bercita cita menjadi Data Analys</p>;
}