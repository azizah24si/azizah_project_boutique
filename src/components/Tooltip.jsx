/**
 * Tooltip Component
 *
 * Props:
 * - content: string — tooltip text
 * - position: "top" | "bottom" | "left" | "right" (default: "top")
 * - children — the element that triggers the tooltip
 * - className
 */
export default function Tooltip({
  content,
  position = "top",
  children,
  className = "",
}) {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrows = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-gray-800",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-800",
    left: "left-full top-1/2 -translate-y-1/2 border-l-gray-800",
    right: "right-full top-1/2 -translate-y-1/2 border-r-gray-800",
  };

  return (
    <div className={`relative inline-flex group ${className}`}>
      {children}

      <div
        className={`absolute z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${positions[position]}`}
      >
        <div className="bg-gray-800 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
          {content}
        </div>
        <div
          className={`absolute w-0 h-0 border-4 border-transparent ${arrows[position]}`}
        />
      </div>
    </div>
  );
}
