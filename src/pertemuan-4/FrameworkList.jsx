import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
    {frameworkData.map((item) => (
      <div
        key={item.id}
        className="group relative border border-gray-100 p-6 rounded-2xl bg-white 
                   transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] 
                   hover:-translate-y-1 flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
              {item.name}
            </h2>
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
              {item.details.developer}
            </span>
          </div>
          
          <p className="text-gray-500 leading-relaxed text-sm mb-4">
            {item.description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 text-[11px] font-medium 
                           px-3 py-1 rounded-full group-hover:bg-blue-50 
                           group-hover:text-blue-600 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={item.details.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-600 
                       hover:text-blue-700 transition-colors"
          >
            Visit Website 
            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}
