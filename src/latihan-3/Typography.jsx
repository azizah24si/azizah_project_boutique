export default function Typography() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
      {/* WRAPPER */}
      <div className="text-center space-y-4">
        
        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-blue-600">
          Tailwind Typography
        </h1>

        {/* SUBTITLE */}
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          Belajar Tailwind sangat menyenangkan dan cepat!
        </p>

        {/* CARD */}
        <BackgroundColors />

      </div>
    </div>
  );
}

function BackgroundColors() {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-2xl shadow-xl max-w-md mx-auto hover:scale-105 transition duration-300">
      
      <h3 className="text-2xl font-bold">
        Tailwind Colors
      </h3>

      <p className="mt-2 text-sm opacity-90">
        Belajar Tailwind itu seru dan fleksibel!
      </p>

    </div>
  );
}