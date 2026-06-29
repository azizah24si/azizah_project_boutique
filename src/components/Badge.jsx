/**
 * Badge Component
 *
 * Props:
 * - variant: "cyan" | "green" | "yellow" | "red" | "gray" | "pink" | "orange" | "purple" | "blue" (default: "cyan")
 * - size: "sm" | "md" (default: "md")
 * - dot: boolean — show a colored dot before text
 * - className, children
 */
export default function Badge({
  children,
  variant = "cyan",
  size = "md",
  dot = false,
  className = "",
}) {
  const variants = {
    cyan: "bg-cyan-100 text-cyan-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
    gray: "bg-gray-100 text-gray-600",
    pink: "bg-pink-100 text-pink-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
    blue: "bg-blue-100 text-blue-600",
  };

  const dotColors = {
    cyan: "bg-cyan-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    gray: "bg-gray-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
    blue: "bg-blue-500",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
}
