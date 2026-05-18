/**
 * Pagination Component
 *
 * Props:
 * - currentPage: number (1-indexed)
 * - totalPages: number
 * - onPageChange: (page: number) => void
 * - showInfo: boolean — show "Halaman X dari Y" text (default: true)
 * - className
 */
export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showInfo = true,
  className = "",
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show max 5 page buttons with ellipsis logic
  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;
    if (currentPage <= 4) return [...pages.slice(0, 5), "...", totalPages];
    if (currentPage >= totalPages - 3)
      return [1, "...", ...pages.slice(totalPages - 5)];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const btnBase =
    "w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all";

  return (
    <div className={`flex items-center justify-between gap-4 flex-wrap ${className}`}>
      {showInfo && (
        <p className="text-sm text-gray-400">
          Halaman{" "}
          <span className="font-bold text-gray-600">{currentPage}</span> dari{" "}
          <span className="font-bold text-gray-600">{totalPages}</span>
        </p>
      )}

      <div className="flex items-center gap-1">
        {/* PREV */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${btnBase} bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed`}
          aria-label="Halaman sebelumnya"
        >
          ‹
        </button>

        {getVisiblePages().map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className={`${btnBase} text-gray-400`}>
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${btnBase} ${
                currentPage === page
                  ? "bg-cyan-400 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* NEXT */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${btnBase} bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed`}
          aria-label="Halaman berikutnya"
        >
          ›
        </button>
      </div>
    </div>
  );
}
