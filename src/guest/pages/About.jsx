import { FaShoppingBag, FaUsers, FaStar, FaHeart, FaAward, FaHandshake } from "react-icons/fa";

export default function About() {
  const values = [
    {
      icon: <FaHeart className="text-3xl" />,
      title: "Passion for Fashion",
      desc: "Kami mencintai fashion dan berkomitmen menghadirkan yang terbaik"
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Quality First",
      desc: "Kualitas premium adalah prioritas utama kami"
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Customer Trust",
      desc: "Kepercayaan pelanggan adalah aset terbesar kami"
    },
    {
      icon: <FaAward className="text-3xl" />,
      title: "Excellence Service",
      desc: "Pelayanan terbaik di setiap interaksi"
    }
  ];

  const team = [
    {
      name: "Azizah Jijah",
      role: "Founder & CEO",
      image: "https://i.pravatar.cc/300?img=1",
      desc: "Passionate about fashion with 10+ years experience"
    },
    {
      name: "Siti Nurhaliza",
      role: "Head of Design",
      image: "https://i.pravatar.cc/300?img=5",
      desc: "Creative designer with international exposure"
    },
    {
      name: "Aisyah Rahman",
      role: "Marketing Director",
      image: "https://i.pravatar.cc/300?img=9",
      desc: "Expert in fashion marketing and branding"
    }
  ];

  const milestones = [
    { year: "2015", event: "Jijah Boutique didirikan" },
    { year: "2017", event: "Membuka showroom pertama" },
    { year: "2019", event: "Mencapai 1000+ happy customers" },
    { year: "2021", event: "Ekspansi koleksi dan tim" },
    { year: "2023", event: "Award Best Boutique Jakarta" },
    { year: "2025", event: "Platform digital & 2300+ customers" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-cyan-500 to-teal-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Tentang Kami</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Perjalanan kami dalam menghadirkan fashion berkualitas untuk wanita Indonesia
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Cerita Kami</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-800">Jijah Boutique</strong> didirikan pada tahun 2015 dengan visi 
                  menghadirkan fashion berkualitas tinggi yang terjangkau untuk wanita Indonesia. Dimulai dari 
                  sebuah toko kecil, kini kami telah melayani lebih dari 2,300 pelanggan setia di seluruh Indonesia.
                </p>
                <p>
                  Kami percaya bahwa setiap wanita berhak tampil percaya diri dengan pakaian yang tidak hanya 
                  indah dipandang, tetapi juga nyaman dikenakan. Itulah mengapa kami sangat selektif dalam memilih 
                  bahan dan desain untuk setiap koleksi kami.
                </p>
                <p>
                  Dengan tim yang berpengalaman dan passionate di bidang fashion, kami terus berinovasi untuk 
                  menghadirkan trend terkini sambil tetap mempertahankan kualitas terbaik yang menjadi trademark 
                  Jijah Boutique.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=700&fit=crop"
                alt="Boutique Store"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prinsip yang menjadi fondasi dalam setiap langkah kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl text-center hover:shadow-lg transition-all">
                <div className="text-cyan-500 flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Perjalanan Kami</h2>
            <p className="text-gray-600">Milestone penting dalam sejarah Jijah Boutique</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-700 font-medium">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tim Kami</h2>
            <p className="text-gray-600">Orang-orang di balik kesuksesan Jijah Boutique</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-cyan-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-cyan-500 to-teal-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShoppingBag className="text-3xl" />
              </div>
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="opacity-90">Produk Fashion</p>
            </div>
            <div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl" />
              </div>
              <h3 className="text-4xl font-bold mb-2">2,300+</h3>
              <p className="opacity-90">Happy Customers</p>
            </div>
            <div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-3xl" />
              </div>
              <h3 className="text-4xl font-bold mb-2">4.9★</h3>
              <p className="opacity-90">Rating Terbaik</p>
            </div>
            <div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-3xl" />
              </div>
              <h3 className="text-4xl font-bold mb-2">10+</h3>
              <p className="opacity-90">Years Experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
